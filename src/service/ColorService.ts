import Colors from "../core/enums/Colors"

export function changeColor(color : Colors) {
    switch(color) {
        case Colors.Black:
            return ' bg--black'
        case Colors.Red:
            return ' bg--red'
        case Colors.Blue:
            return ' bg--blue'
        case Colors.White:
            return ' bg--white'
    }
}