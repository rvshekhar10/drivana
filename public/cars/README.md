# Car Media - Folder Structure

Each car gets its own folder. This scales cleanly to 100+ cars across multiple cities.

## Structure

```
public/cars/
├── nissan-magnite/
│   ├── front.jpg          ← Featured image
│   ├── side.jpg
│   ├── interior.jpg
│   ├── rear.jpg
│   └── walkaround.mp4     ← Optional video
├── tata-tiago/
│   ├── front.jpg
│   ├── side.jpg
│   ├── interior.jpg
│   └── rear.jpg
├── maruti-alto-1/
│   ├── front.jpg
│   ├── side.jpg
│   └── interior.jpg
├── maruti-alto-2/
│   ├── front.jpg
│   ├── side.jpg
│   └── interior.jpg
└── ford-freestyle/
    ├── front.jpg
    ├── side.jpg
    ├── interior.jpg
    └── rear.jpg
```

## Future Multi-City Structure

When you expand to multiple cities, the structure can evolve to:

```
public/cars/
├── patna/
│   ├── nissan-magnite-001/
│   │   ├── front.jpg
│   │   ├── side.jpg
│   │   └── interior.jpg
│   ├── tata-tiago-001/
│   └── ...
├── ranchi/
│   ├── hyundai-creta-001/
│   └── ...
└── varanasi/
    └── ...
```

## Adding a New Car

1. Create a folder: `public/cars/{car-slug}/`
2. Add images inside: `front.jpg`, `side.jpg`, `interior.jpg`, `rear.jpg`, etc.
3. Update `src/data/cars.json` with the new car entry and media array

## Naming Conventions

| File | Purpose |
|------|---------|
| `front.jpg` | Front 3/4 angle (always the featured image) |
| `side.jpg` | Side profile |
| `rear.jpg` | Rear 3/4 angle |
| `interior.jpg` | Dashboard & steering |
| `seats.jpg` | Rear seats / cabin space |
| `boot.jpg` | Boot/trunk space |
| `detail-1.jpg` | Close-up of a feature (touchscreen, etc.) |
| `walkaround.mp4` | Video walkaround |

## Image Specs

- **Resolution:** 800x600px minimum (landscape)
- **Format:** JPG or WebP
- **File size:** Under 500KB each
- **Tips:** Good lighting, clean car, multiple angles

## Video Specs

- **Format:** MP4 (H.264)
- **Resolution:** 720p or 1080p
- **Duration:** 15-60 seconds
- **File size:** Under 10MB
