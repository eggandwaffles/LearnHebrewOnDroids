function RandInt (lowerBound, upperBound) {
    var seed = Math.random()
    var base = seed * (upperBound - lowerBound)
    var upShift = base + lowerBound
    var fin = Math.floor(upShift)
    return fin
}
module.exports = { RandInt }