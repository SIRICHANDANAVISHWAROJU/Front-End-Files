window.addEventListener("load", function () {
    var firstBox = document.getElementById("ch1");
    if (firstBox) {
        firstBox.focus();
    }
});

function getGradePoints(letter) {
    if (!letter) return null;

    letter = letter.trim().toUpperCase();

    switch (letter) {
        case "A":  return 4.0;
        case "B":  return 3.0;
        case "C":  return 2.0;
        case "D":  return 1.0;
        case "F":  return 0.0;
        default:   return null;   
    }
}

function calculateGPA() {
    var creditIds = ["ch1", "ch2", "ch3", "ch4", "ch5"];
    var gradeIds  = ["gr1", "gr2", "gr3", "gr4", "gr5"];

    var totalQualityPoints = 0;  
    var totalCredits = 0;        
    var usedCourses = 0;         

    for (var i = 0; i < creditIds.length; i++) {
        var chValue = document.getElementById(creditIds[i]).value.trim();
        var grValue = document.getElementById(gradeIds[i]).value.trim();

        if (chValue === "" && grValue === "") {
            continue;
        }

        if (chValue === "" || grValue === "") {
            alert("For each course, please enter BOTH credit hours and letter grade.");
            document.getElementById(creditIds[i]).focus();
            return;
        }

        var credits = parseFloat(chValue);
        var gradePoints = getGradePoints(grValue);

        if (isNaN(credits) || credits <= 0) {
            alert("Credit hours must be a positive number (Course " + (i + 1) + ").");
            document.getElementById(creditIds[i]).focus();
            return;
        }

        if (gradePoints === null) {
            alert("Invalid grade for Course " + (i + 1) + ". Use A, B, C, D, or F.");
            document.getElementById(gradeIds[i]).focus();
            return;
        }

        usedCourses++;
        totalCredits += credits;
        totalQualityPoints += gradePoints * credits;
    }

    if (usedCourses < 2) {
        alert("Please enter at least TWO courses with credit hours and letter grades.");
        return;
    }

    if (totalCredits === 0) {
        alert("Total credit hours cannot be zero.");
        return;
    }

    var gpa = totalQualityPoints / totalCredits;

    document.getElementById("avgGpa").value = gpa.toFixed(2);
}

function resetGPA() {
    var ids = ["ch1","ch2","ch3","ch4","ch5","gr1","gr2","gr3","gr4","gr5","avgGpa"];

    for (var i = 0; i < ids.length; i++) {
        var box = document.getElementById(ids[i]);
        if (box) {
            box.value = "";
        }
    }

    var firstBox = document.getElementById("ch1");
    if (firstBox) {
        firstBox.focus();
    }
}
