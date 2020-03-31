export const kelvinToCelsius = (val) => {
    var k = val - 273.15;
    return k.toFixed(0)+'\xB0C';
};