class Calculate {
    constructor() {}

    /**
     * Calculates cartesian distance between two points
     * @param {array<number>} p1 
     * @param {array<number>} p2 
     * @returns {number} Distance
     */
    static cartesianDistance(p1, p2) {
        return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
    }

    /**
     * Calculates the earth distance between two coordinates.
     * Shamelessly stolen from https://www.movable-type.co.uk/scripts/latlong.html
     * @param {array<number>} p1 
     * @param {array<number>} p2 
     * @returns {number} Distance
     */
    static earthDistance(p1, p2) {
        const R = 6378000; // metres
        const φ1 = p1[1] * Math.PI / 180; // φ, λ in radians
        const φ2 = p2[1] * Math.PI / 180;
        const Δφ = (p2[1] - p1[1]) * Math.PI / 180;
        const Δλ = (p2[0] - p1[0]) * Math.PI / 180;
        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in metres
    }

    /**
     * Apply the inverse distance weighting interpolation math. See here,
     * https://gisgeography.com/inverse-distance-weighting-idw-interpolation/
     * Interpolation by closest points with power of 2 on the value.
     * @param {array<array>} badRecord 
     * @param {array<array>} spatialNeighbors 
     */
    static interpolateBadRecord(badRecord, spatialNeighbors) {
        let initialValue = 0;
        if (badRecord[2] === 0) {
            badRecord[2] = (spatialNeighbors.reduce((accumulator, record) => accumulator + (record.point[2] / Math.pow(record.distance, 2)), initialValue) /
                spatialNeighbors.reduce((accumulator, record) => accumulator + (1 / Math.pow(record.distance, 2)), initialValue)).toFixed(2);
        }
        return badRecord;
    }

    /**
     * Returns bad records based on the value field with zero values
     * @param {array<array>} records 
     * @returns {array<array>} records 
     */
    static findBadRecords(records) {
        return records.filter((record) => record[2] === 0);
    }

    /**
     * Returns two closest neighbors for each of the bad records.
     * @param {array<array>>} validRecords 
     * @param {array<array>>} badRecords 
     * @param {number} closestPointsCount 
     * @returns {object} 
     */
    static findSpatialNeighbors(validRecords, badRecords, closestPointsCount) {
        return badRecords.map((record) => {
            return {
                badRecord: record,
                spatialNeighbors: validRecords
                    .map((vRecord) => { // 1.Find distance between current bad record to a valid record
                        return {
                            point: vRecord,
                            distance: Calculate.earthDistance(record, vRecord) // Default we use earth distance math to compute distance
                        };
                    })
                    .sort(function (a, b) { // 2.Sort by least distance(closest point) to the bad record from the valid records
                        return a.distance - b.distance;
                    })
                    .slice(0, closestPointsCount) // 3.Take only the given number of closest points
            };
        });
    }
}