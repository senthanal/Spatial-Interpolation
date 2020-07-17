class Calculate {
    constructor() {}

    /**
     * Calculates cartesian distance between two points
     * @param {array<number>} p1 
     * @param {array<number>} p2 
     */
    static distance(p1, p2) {
        return Math.sqrt(Math.pow(p2[1] - p1[1], 2) + Math.pow(p2[2] - p1[2], 2));
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
                            distance: Calculate.distance(record, vRecord)
                        };
                    })
                    .sort(function(a, b) { // 2.Sort by least distance(closest point) to the bad record from the valid records
                        return a.distance - b.distance;
                    })
                    .slice(0, closestPointsCount) // 3.Take only the given number of closest points
            };
        });
    }
}