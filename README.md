# Beat Speedrun Regulations

## Rules

- `rules` for each regulations maintained in this repository must be immutable.
- The regulation based on ScoreSaber's regulation must be placed under scoresaber/.

## Format (v1)

```json
{
  "$schema": "https://json-schema.org/draft/2019-09/schema",
  "type": "object",
  "properties": {
    "version": {
      "type": "integer",
      "description": "Version of the regulation format. It must be 1."
    },
    "title": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "rules": {
      "type": "object",
      "properties": {
        "mapSet": {
          "type": "string",
          "description": "Reference to the map set. It must be an URL or a relative path to the map set JSON from mapsets repository (https://github.com/acc-is-sponge/beat-speedrun-mapsets)"
        },
        "base": {
          "type": "number",
          "description": "Base factor of the pp gained"
        },
        "curve": {
          "type": "array",
          "items": {
            "type": "array",
            "items": [
              { "type": "number" },
              { "type": "number" }
            ],
            "minItems": 2,
            "maxItems": 2
          },
          "description": "This defines PP curve slopes."
        },
        "weight": {
          "type": "number",
          "description": "Factor to be multiplied by pp of the play."
        },
        "segments": {
          "type": "object",
          "description": "Segmentation based on pp value.",
          "additionalProperties": {
            "type": "number"
          }
        },
        "modifiersOverride": {
          "type": "object",
          "description": "Overriding modifiers factor. It is used to disable positive modifiers for example.",
          "properties": {
            "NoPause": {
              "type": "number",
              "description": "Modifier not in vanilla Beat Saber, specially supported by Beat Speedrun.",
              "default": 1
            },
            "BatteryEnergy": { "type": "number" },
            "NoFail": { "type": "number" },
            "InstaFail": { "type": "number" },
            "NoObstacles": { "type": "number" },
            "NoBombs": { "type": "number" },
            "StrictAngles": { "type": "number" },
            "DisappearingArrows": { "type": "number" },
            "FasterSong": { "type": "number" },
            "SlowerSong": { "type": "number" },
            "NoArrows": { "type": "number" },
            "GhostNotes": { "type": "number" },
            "SuperFastSong": { "type": "number" },
            "ProMode": { "type": "number" },
            "ZenMode": { "type": "number" },
            "SmallCubes": { "type": "number" }
          },
          "additionalProperties": false
        }
      },
      "additionalProperties": false,
      "required": ["mapSet", "base", "curve", "weight", "segments"]
    }
  },
  "additionalProperties": false,
  "required": ["version", "title", "description", "rules"]
}
```

In short in TypeScript:

```ts
type Regulation = {
  version: number; // integer
  title: string;
  description: string;
  rules: Rules;
}

type Rules = {
  mapSet: string;
  base: number;
  curve: [number, number][];
  weight: number;
  segments: { [P in string]: number };
  modifiersOverride?: { [M in Modifiers]?: number };
};

type Modifiers =
  | 'NoPause'
  | 'BatteryEnergy'
  | 'NoFail'
  | 'InstaFail'
  | 'NoObstacles'
  | 'NoBombs'
  | 'StrictAngles'
  | 'DisappearingArrows'
  | 'FasterSong'
  | 'SlowerSong'
  | 'NoArrows'
  | 'GhostNotes'
  | 'SuperFastSong'
  | 'ProMode'
  | 'ZenMode'
  | 'SmallCubes';
```
