# Formation Station

This repository contains an interactive choreography prototype where users can:

- create and edit multiple formations
- place and move dancers across formations
- add audio to a timeline
- play back choreography over time
- record the choreography playback to a downloadable video file

The prototype implementation is in [src/app/App.tsx](src/app/App.tsx).

## Setup and Run

From the project root:

```bash
npm install
npm run dev
```

Then open the local URL shown in terminal.

## Prototype Evidence

Follow these steps to reproduce the core behaviors shown in evidence clippings.

### Open the editor

1. Launch the app in browser.
2. Click `open new project`.

### Create choreography with multiple formations

1. In the timeline `Formation` row, click the `+` button to create `Formation 1`.
2. Click on the stage to add at least 2 dancers.
3. Drag dancers to visible positions.
4. Click `+` again to create `Formation 2` (it copies previous dancers).
5. Move dancers to clearly different positions.
6. Click `+` again to create `Formation 3`.
7. Move dancers again so each formation is visibly different.

The timeline should show at least 3 formation blocks and stage layout changes between formations.

### Add audio

1. In the `Audio` row, click `+`.
2. Upload a `.wav` file.

The audio block should appear in timeline with filename/duration.

### Playback

1. Click `Play`.
2. Observe timeline playhead moving.

Dancers should animate across formations while playhead advances.

### Recording and download

1. Click `Record` (red button).  
   You can also start from `Play` and then click `Record`.
2. Wait for recording to complete (or click record again to stop early).