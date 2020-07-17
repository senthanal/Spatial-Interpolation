Functional Requirements
-----------------------

1. Load a csv file through file browser
2. Delimiter can be either space or a single comma
3. The csv file contains 2D matrix of numbers(spatial coordinates)
4. Display the content in a text box or table.
5. Replace zero values by interpolating with spatial neighbours
6. Write the result in another text box or table.

Technical Requirements
----------------------

1. HTML5 File browser with limiting only to single csv file
2. Parse csv file to collect metrics(file size, delimiter and  header row) and records
3. Javascript to render table
4. Javascript business logic to replace the zero values by spatial interpolation technique called Inverse Distance Weighting(IDW) method from <https://gisgeography.com/inverse-distance-weighting-idw-interpolation/>

Workflow in steps
--------

  1. Parse the csv data
  2. Print delimiter
  3. Print has header row
  4. Print file size
  5. Print total number of records count
  6. Print input records table
  7. Filter the bad records when the value field is zero
  8. Print number of bad recods count
  9. Print bad recods table
  10. Filter valid records by removing bad records
  11. Find the two closest valid points to the bad records
  12. Calculate the interpolated values using IDW math for bad records based on the two closest points
  13. Update the interpolated values into the original records
  14. Print the final interpolated recods
