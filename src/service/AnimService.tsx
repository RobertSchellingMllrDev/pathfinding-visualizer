import Colors from "../core/enums/Colors"

export function changeAnim(color : Colors) {
    switch(color) {
        case Colors.Black:
            return '--black-anim'
        case Colors.Red:
            return '--red-anim'
        case Colors.Blue:
            return '--blue-anim'
        case Colors.White:
            return ''
    }
}