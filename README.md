# Beat Speedrun Regulations

Regulation definitions for [Beat Speedrun MOD](https://github.com/acc-is-sponge/beat-speedrun-mod).

## Rules

- Regulations maintained in this repository must be immutable.
- The regulation based on ScoreSaber's regulation must be placed under `scoresaber/`.

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
          "description": "Reference to the map set"
        },
        "base": {
          "type": "number",
          "description": "A base factor of the pp gained"
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
          "description": "This defines PP curve slopes. Only linear interpolation is supported."
        },
        "weight": {
          "type": "number",
          "description": "A weighting factor to be multiplied in order from Top Scores."
        },
        "timeLimit": {
          "type": "integer",
          "description": "Seconds before the speedrun runs out of time."
        },
        "segmentRequirements": {
          "type": "object",
          "description": "Required pp per segment.",
          "properties": {
            "Bronze": {
              "type": "number",
              "default": 1000
            },
            "Silver": {
              "type": "number",
              "default": 2000
            },
            "Gold": {
              "type": "number",
              "default": 3000
            },
            "Platinum": {
              "type": "number",
              "default": 4000
            },
            "Emerald": {
              "type": "number",
              "default": 5000
            },
            "Sapphire": {
              "type": "number",
              "default": 6000
            },
            "Ruby": {
              "type": "number",
              "default": 7000
            },
            "Diamond": {
              "type": "number",
              "default": 8000
            },
            "Master": {
              "type": "number",
              "default": 9000
            },
            "Grandmaster": {
              "type": "number",
              "default": 10000
            }
          },
          "additionalProperties": false
        },
        "modifiersOverride": {
          "type": "object",
          "description": "Overriding modifiers factors. It is used to disable positive modifiers for example.",
          "properties": {
            "UsePause": {
              "type": "number",
              "description": "Extra modifier provided by Beat Speedrun. In-game pause enables this modifier.",
              "default": 1
            },
            "BatteryEnergy": {
              "type": "number",
              "default": 1
            },
            "NoFail": {
              "type": "number",
              "default": 0.5
            },
            "InstaFail": {
              "type": "number",
              "default": 1
            },
            "NoObstacles": {
              "type": "number",
              "default": 0.95
            },
            "NoBombs": {
              "type": "number",
              "default": 0.9
            },
            "StrictAngles": {
              "type": "number",
              "default": 1
            },
            "DisappearingArrows": {
              "type": "number",
              "default": 1.07
            },
            "FasterSong": {
              "type": "number",
              "default": 1.08
            },
            "SlowerSong": {
              "type": "number",
              "default": 0.7
            },
            "NoArrows": {
              "type": "number",
              "default": 0.7
            },
            "GhostNotes": {
              "type": "number",
              "default": 1.11
            },
            "SuperFastSong": {
              "type": "number",
              "default": 1.1
            },
            "ProMode": {
              "type": "number",
              "default": 1
            },
            "SmallCubes": {
              "type": "number",
              "default": 1
            }
          },
          "additionalProperties": false
        }
      },
      "additionalProperties": false,
      "required": ["mapSet", "base", "curve", "weight", "timeLimit"]
    }
  },
  "additionalProperties": false,
  "required": ["version", "title", "description", "rules"]
}
```

`rules.mapSet` must be one of:

- A relative path to the MOD-provided MapSet, defined in the [beat-speedrun-mapsets](https://github.com/acc-is-sponge/beat-speedrun-mapsets) repository.
  - e.g. `"scoresaber/v3/all/2023-09-16.json"`
- An URL to the MapSet, starts with `https:`
  - e.g. `"https://raw.githubusercontent.com/acc-is-sponge/beat-speedrun-mapsets/main/scoresaber/092023.json"`
- `custom:` followed by a relative path to the custom MapSet, placed in the `$(BeatSaberDir)/UserData/BeatSpeedrun/CustomMapSets`
  - e.g. `"custom:tourney-2023.json"`
  - supported in v0.2.0~

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
  timeLimit: number; // integer
  segmentRequirements?: { [P in Segments]?: number };
  modifiersOverride?: { [M in Modifiers]?: number };
};

type Segments =
  | 'Bronze'
  | 'Silver'
  | 'Gold'
  | 'Platinum'
  | 'Emerald'
  | 'Sapphire'
  | 'Ruby'
  | 'Diamond'
  | 'Master'
  | 'Grandmaster';

type Modifiers =
  | 'UsePause'
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
  | 'SmallCubes';
```
