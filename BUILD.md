# BUILD — how clip.mp4 was produced

All steps were run by the agent in one session. Scratch work lived outside the repo; only the finished
`clip.mp4` and the text files were kept here.

## 1. Source

yt-dlp (fetched as a single binary from its GitHub releases) downloaded Rockstar's official upload:

    yt-dlp --js-runtimes node -f "137+140" --merge-output-format mp4 \
      "https://www.youtube.com/watch?v=rz1B4B2yBZY"   # Grand Theft Auto VI Launch Trailer, 90s, 1080p

(The `--js-runtimes node` flag mattered: without it the first download died with an HTTP 403 at 42%.)

## 2. Choosing the moment

Frames were extracted every 3s over the whole trailer, then every 0.5s and 0.25s around the candidates.
The dirt-bike jump (approach 48.25, launch ~48.5, peak air ~49.0–49.75, touchdown ~50.25) beat the other
candidates (sunset skyline at 24s, night supercar at 45s, beach flyover at 54s) because it is pure motion
with a centred subject. A test crop at 608:1080:500:0 confirmed the rider stays centred in 9:16 through
the whole arc, so a static crop — no blur-fill — was used.

## 3. Segments (ffmpeg 8.1.2, DejaVu Sans Bold captions throughout)

    # hook: the jump at full speed
    ffmpeg -ss 48.25 -i launch-trailer.mp4 -t 2.2 \
      -vf "crop=608:1080:500:0,scale=1080:1920,setsar=1,fps=30" -an seg1-hook.mp4

    # slo-mo replay: same window, 6x slower, motion-interpolated back to 30fps
    ffmpeg -ss 48.25 -i launch-trailer.mp4 \
      -vf "trim=end=2.2,setpts=PTS-STARTPTS,crop=608:1080:500:0,setpts=6*PTS,\
           minterpolate=fps=30:mi_mode=mci:mc_mode=aobmc:me_mode=bidir,scale=1080:1920,setsar=1" \
      -an seg2-slomo.mp4

    # freeze: peak frame (49.6s) with a slow push-in
    ffmpeg -ss 49.6 -i launch-trailer.mp4 -frames:v 1 -vf "crop=608:1080:500:0,scale=2160:3840" hero.png
    ffmpeg -loop 1 -i hero.png -t 8 \
      -vf "zoompan=z='1+0.22*on/240':x='iw/2-(iw/zoom/2)':y='ih*0.42-(ih/zoom/2)':d=240:s=1080x1920:fps=30,setsar=1" \
      seg3-freeze.mp4

    # pitch backdrop: the trailer's logo / release-date card, half speed, darkened
    ffmpeg -ss 76.2 -i launch-trailer.mp4 \
      -vf "trim=end=6.3,setpts=PTS-STARTPTS,crop=608:1080:656:0,setpts=2*PTS,scale=1080:1920,setsar=1,fps=30,\
           eq=brightness=-0.18:saturation=0.9" -an seg4-pitch.mp4

Two traps worth recording: an output-side `-t` silently capped the first slo-mo and pitch renders at
their unstretched lengths (fixed by trimming inside the filter graph), and ffmpeg asks before overwriting
an existing segment file — pass `-y`.

## 4. Assembly

The four segments were concatenated and captioned in one pass (drawtext, white DejaVu Sans Bold, black
border + translucent box, `enable` windows on the output timeline), and the audio was mixed from the
trailer itself: the jump window's own audio (48.25–50.42) over a quiet bed of the trailer score
(54.0–89.6 at 0.4 gain, faded in/out), limited to 0.95.

Caption timeline of the final render (35.6s):

    0.0–2.2    GTA 6 / IS FINALLY HERE
    2.2–8.3    AGAIN. IN SLO-MO.
    8.3–15.0   13 YEARS OF WAITING. / WORTH IT.
    15.0–23.0  WELCOME BACK / TO LEONIDA
    23.0–27.2  MAKE CLIPS / LIKE THIS WITH AI
    27.2–31.4  EARN REAL MONEY / ON make.fun
    31.4–35.6  make.fun/bounty/ gta6-clipper-01  (+ LINK IN THE DESCRIPTION)

## 5. Revision history

- **v1** was frame-checked at seven timestamps and rejected by the agent: every long caption ran off both
  edges of the 1080-wide frame, and the pitch segment opened on the logo card's colour-fade instead of the
  logo. 
- **v2** (the shipped `clip.mp4`) split every long caption into two stacked lines sized to the frame and
  moved the pitch backdrop's in-point from 74.8s to 76.2s so the segment starts on the logo itself. The
  same seven frames were re-checked: all captions fit, the rider stays centred, the pitch is legible over
  both the logo and the release-date card.

Final specs: 1080×1920, 30fps, 35.6s, H.264 (yuv420p) + AAC, 15,288,597 bytes.
