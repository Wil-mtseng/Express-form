const html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="http://localhost:3000/app.css" type="text/css">

    <title>Visitor</title>
</head>

<body>

    <div class="container" style="display: inline-flexbox;">
        <form action="/thank-you" method="POST">
            <div class="row">
                <div class="col-25">
                    <label for="Name"></label>
                </div>
                <div class="col-75">
                    <input type="text" id="Name" name="name" placeholder="Your name.." style=" background-color: #191818">
                    <hr>
                </div>
            </div>

            <div class="row">
                <div class="col-25">
                    <label for="Assistant"></label>
                </div>
                <div class="col-75">
                    <input type="text" id="Assistant" name="assistant" placeholder="Assistant's name.." style=" background-color: #191818">
                    <hr>
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="Age"></label>
                </div>
                <div class="col-75">
                    <input type="text" id="Age" name="age" placeholder="Your age.." style=" background-color: #191818">
                    <hr>
                </div>
            </div>

            <div class="row">
                <div class="col-25">
                    <label for="Date"></label>
                </div>
                <div class="col-75">
                    <input type="text" id="Date" name="date" placeholder="Today's date.." style=" background-color: #191818">
                    <hr>
                </div>
            </div>

            <div class="row">
                <div class="col-25">
                    <label for="Time"></label>
                </div>
                <div class="col-75">
                    <input type="text" id="Time" name="time" placeholder="Time of visit.." style=" background-color: #191818">
                    <hr>
                </div>
            </div>

            <div class="row">
                <div class="col-25">
                    <label for="Comments"></label>

                </div>
                <div class="col-75">
                    <textarea id="message" name="comments" placeholder="Leave us a comment.." style=" background-color: #191818"></textarea>
                    <hr>
                </div>
            </div>

            <div class="row">
                <input type="submit" value="Submit" style="widows: 1000px;">
            </div>
        </form>
    </div>
</body>

</html>`
module.exports = html