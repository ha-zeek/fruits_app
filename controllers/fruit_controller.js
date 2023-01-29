const express = require("express");
const router = express.Router();

module.exports = router;

const fruit = require("../model/fruit_schema.js");

// to test application route
router.get("/", (req, res) => {
  res.send("Hello from fruits app");
});

// to load new form
router.get("/fruits/new", (req, res) => {
  res.render("new.ejs");
});

router.post("/fruits", (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }

  fruit.create(req.body, (err, createdFruit) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/fruits");
    }
  });
  //   res.send(req.body);
});

router.get("/", (req, res) => {
  res.redirect("/fruits");
});

router.get("/fruits", (req, res) => {
  fruit.find({}, (err, fruitDetails) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index.ejs", { fruits: fruitDetails });
    }
  });
});

router.get("/fruits/seed", (req, res) => {
  fruit.insertMany(
    [
      { name: "grapefruit", color: "pink", readyToEat: true },
      { name: "grape", color: "green", readyToEat: false },
      { name: "rasberry", color: "red", readyToEat: true },
    ],
    (err, success) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/fruits");
      }
    }
  );
});

router.get("/fruits/:id", (req, res) => {
  fruit.findById(req.params.id, (err, foundFruit) => {
    if (err) {
      console.log(err);
    } else {
      //   res.send(foundFruit);
      res.render("view.ejs", { fruit: foundFruit });
    }
  });
});

router.get("/fruits/:id/edit", (req, res) => {
  fruit.findById(req.params.id, (err, foundFruit) => {
    if (err) {
      console.log(err);
    } else {
      res.render("edit.ejs", { fruit: foundFruit });
    }
  });
});

router.delete("/fruits/:id", (req, res) => {
  //   res.send("deleting.....");
  fruit.findByIdAndDelete(req.params.id, (err, success) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/fruits");
    }
  });
});

router.put("/fruits/:id", (req, res) => {
  req.body.readyToEat = req.body.readyToEat === "on";
  fruit.findByIdAndUpdate(req.params.id, req.body, (err, updatedFruit) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/fruits");
    }
  });
});
