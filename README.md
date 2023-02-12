# csv-to-excel-to-png

Project Brief:
1.Build an API endpoint that allows users to upload a CSV file (POST multipart/form-data).
2. Eliminate all blank rows, insert a column at the beginning to assign a serial number to each row.
3. Export the result as an .xlsx (Excel) file and generate a Pie chart to represent Gender ratio as (.png)

How to test the api?
1.POST REQUEST: Kindly hit the url "http://localhost:5000/single" with body form-data as {file:xena_nodejs_task.csv}.
2.Uploaded csv can be seen under the uploaded folder.
3.Modified CSV(without blank rows) can be seen under the uploads folder.
4.Generated excel and pie chart(as .png) can also be seen under the uploads folder.

Server.js is the main file for api calls.

FRAMEWORKS USED:
1.NODEJS
2.EXPRESS 



