class Calculate {
    constructor() {}

    /**
     * 
     * @param {*} p1 
     * @param {*} p2 
     */
    static distance(p1, p2) {
        return Math.sqrt(Math.pow(p2[1] - p1[1], 2) + Math.pow(p2[2] - p1[2], 2));
    }

    static interpolateBadRecord(badRecord, spatialNeighbors) {
        let x = null,
            y = null;
        let initialValue = 0;
        if (badRecord[1] === 0) {
            x = spatialNeighbors.reduce((accumulator, record) => accumulator + (record.point[1] / Math.pow(record.distance, 2)), initialValue) /
                spatialNeighbors.reduce((accumulator, record) => accumulator + (1 / Math.pow(record.distance, 2)), initialValue);
        }
        if (badRecord[2] === 0) {
            y = spatialNeighbors.reduce((accumulator, record) => accumulator + (record.point[2] / Math.pow(record.distance, 2)), initialValue) /
                spatialNeighbors.reduce((accumulator, record) => accumulator + (1 / Math.pow(record.distance, 2)), initialValue);
        }

        return {
            id: badRecord[0],
            x: x || badRecord[1],
            y: y || badRecord[2]
        };
    }

    static findBadRecords(records) {
        return records.filter((record) => record.indexOf(0) > -1);
    }

    static findSpatialNeighbors(records, badRecords) {
        let validRecords = records.filter((record) => badRecords.indexOf(record) === -1);
        return badRecords.map((record) => {
            return {
                badRecord: record,
                spatialNeighbors: validRecords
                    .map((vRecord) => { // Find distance between current bad record to a valid record
                        return {
                            point: vRecord,
                            distance: Calculate.distance(record, vRecord)
                        };
                    })
                    .sort(function(a, b) { // Sort by least distance to the bad record from the valid records
                        return a.distance - b.distance;
                    })
                    .slice(0, 2) // Take first two least distance records
            };
        });
    }
}