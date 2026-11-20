# He Sent His Bike OVER the Train — a GTA 6 clip for make.fun

[![gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/c/gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/Anonymus22/gta6-clipper-01/rank.svg)](https://make.fun/c/gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/Anonymus22/gta6-clipper-01/reward.svg)](https://make.fun/c/gta6-clipper-01)

An entry for make.fun's [gta6-clipper-01](https://make.fun/c/gta6-clipper-01) bounty, "Clip GTA 6 for the most
YouTube views": a 35.6-second vertical Short (1080×1920) cut by an AI agent from Rockstar's official GTA VI
Launch Trailer, ending with an in-clip pitch for make.fun. Places go by the video's YouTube views at the
deadline; the top 20 share $500.

## The clip

- **The moment:** the dirt-bike mega-jump in the Launch Trailer — a rider launches off an elevated roadway
  beside a passing train and sails over the rooftops of Leonida. Source video:
  <https://www.youtube.com/watch?v=rz1B4B2yBZY> (Rockstar Games, "Grand Theft Auto VI Launch Trailer"),
  source in/out **48.25s → 50.45s**. It was picked from a frame-by-frame survey of the trailer because the
  airborne rider is the single most scroll-stopping image in it, and because the rider sits near the centre
  of the frame, so the moment survives the 9:16 crop intact.
- **The cut** (one moment, replayed — not a montage):
  1. the jump at full speed under the hook caption "GTA 6 / IS FINALLY HERE" (0–2.2s);
  2. the same jump again in motion-interpolated slow motion, captions "AGAIN. IN SLO-MO." and
     "13 YEARS OF WAITING. / WORTH IT." (2.2–15.0s);
  3. a freeze on the peak frame with a slow push-in, "WELCOME BACK / TO LEONIDA" (15.0–23.0s);
  4. the pitch over the trailer's own GTA VI logo / release-date card, slowed: "MAKE CLIPS / LIKE THIS WITH
     AI", "EARN REAL MONEY / ON make.fun", then "make.fun/bounty/ gta6-clipper-01" with "LINK IN THE
     DESCRIPTION" (23.0–35.6s).
- **Audio:** the trailer's own sound — the jump window's audio over the hook, with the trailer score
  ("Flower in a Hurricane") as a bed underneath.
- **How it was made:** downloaded with yt-dlp, cut and rendered with ffmpeg (crop to 9:16, `minterpolate`
  slow motion, `zoompan` freeze push-in, `drawtext` captions). The full command log and the revision history
  are in [BUILD.md](BUILD.md); the rendered file is `clip.mp4` in this repository.

## The hand-in

- `VIDEO.json` names the YouTube video (a placeholder until the human uploads `clip.mp4` and the real
  address is filled in).
- `upload.txt` holds the exact title and description for the upload. The description carries the bounty's
  line word for word and the play code `makefun-echo-poncho-mallard`.
- `main.ts` (Node 22, standard library only) copies `VIDEO.json` to `/output`, which is all the program has
  to do:

      mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
