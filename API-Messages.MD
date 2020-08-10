# API Message structure

## Labeling

### ChangeObject

Notes:

- index: expecting 0 -> 6 from a 7 item dropdown.
- defect: expecting true or false based off of the value of the toggle/switch.

```
{
  topic: label_view,
  message:
  {
    api: change_object
    param:
    {
      name: string,
      rotation: {x: float, y: float, z: float}
    }
  }
}
```

### Cycle object

notes:

- Cycles the objects based on the item. For example, if [Item 2] and (x) defect are checked. The button will cycle through all five defects of Item 2. \*currently there are 5 defects for each 1 non-defect condition.
- Not used..

```
{
  topic: label_view,
  message:
  {
    api: cycle_object
  }
}
```

### Get Image View

```
Outgoing
{
  topic: label_view,
  message:
  {
   api: get_image_view
  }
}
Response
{
  topic: "img_raw"
  message:
  {
    value: png_data
  }
}
```

### Object Rotation

notes:

- keyevents
  - `pressed_up`
  - `pressed_down`
  - `released_up`
  - `released_down`
  - `pressed_right`
  - `pressed_left`
  - `released_left`
  - `released_right`

```
{
  topic: "keyboard_override"
  message:
  {
    api: 'pressed_up'
  }
}
```

## Inferencing

### Inference Request from Unity

Notes:

- Unity initiates this message handshake.

```
UnityGame -> UnityReact
{
  topic: "inference",
  message: {
    value: {
      img: byte [],
      uid: "XXX-XXX-XXX",
      name: string,
      rotation: {x,y,z},
      dispose: bool,
    }
  }
}
Response
UnityReact -> UnityGame
{
  topic: "inference"
  message: {
    api: "prediction",
    param: {
      dispose: bool,
      rgba: {r: float, g: float, b: float, a: float},
      uid: "XXX-XXX-XXX",
    }
  }
}
```
### Request Inference
```
{
  topic: "inference"
  message: {
    api: "inference_request"
  }
}
```
### Show Score
```
{
topic: "show_score",
message: null
}
```
## Game State

### Stop Render

notes:

- Stops all cameras in scene from rendering. Sets time scale to 0.

```
{
  topic: "game_state",
  message: {
   api: "stop_render"
  }

```

### Start Render

notes:

- Starts rendering on all cemeras in scene. Sets time scale to 1.

```
{
  topic: "game_state",
  message: {
   api: "start_render"
  }
}
```
