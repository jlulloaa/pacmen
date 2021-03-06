
<h1 align="center">
  PacMen Factory
  <br>
</h1>
<h4 align="center">A fancy way to learn emulating motion in a webpage</h4>

<p align="center">
<a href="https://validator.nu/?doc=https://jlulloaa.github.io/pacmen">
<img alt="W3C Validation" src="https://img.shields.io/w3c-validation/html?logo=w3c&style=plastic&targetUrl=https%3A%2F%2Fjlulloaa.github.io%2Fpacmen">
</a>
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/jlulloaa/pacmen?style=plastic">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/jlulloaa/pacmen?color=yellow&style=plastic">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/jlulloaa/pacmen?style=plastic">
  <a href="https://github.com/jlulloaa/pacmen/blob/main/LICENSE" target="_blank"> <img src="https://img.shields.io/github/license/jlulloaa/pacmen?style=plastic"></a>

</p>

<p align="center">
  <a href="#description">Description</a> •
  <!-- <a href="#file-manifest">Files</a> • -->
  <a href="#how-to-run">How To Run</a> •
  <a href="#roadmap-of-future-improvements">What's next?</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#credits">Credits</a> •
  <a href="#license-information">License</a>
</p>

<img alt="Pacmen Screenshot" src="howto/screenshot.png">

# :ghost: Description
PacMen Factory is an exploratory exercise I am doing as part of the [full-stack web developer certificate](https://executive-ed.xpro.mit.edu/professional-certificate-coding) I am pursuing. The idea of this exercise is to help understanding the concepts of asynchronous programming and callback functions in javascript, as well as interacting with the [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) via javascript and exploring formatting capabilities with [CSS styles](https://www.w3schools.com/html/html_css.asp) and [bootstrap](https://getbootstrap.com/) templates.

By using a set of pacman images in different states (see images below) and the use of the function [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout), we create the illusion of motion of the little creatures appearing on the screen, pretty much like the concept behind [movie creation](https://en.wikipedia.org/wiki/Film).

<p align=center>
<img alt="Pacmen 001" src="assets/img/PacMan1.png" height=32px><img alt="Pacmen 002" src="assets/img/PacMan2.png" height=32px> Set of pacman images used to create the illusion of motion <img alt="Pacmen 003" src="assets/img/PacMan3.png" height=32px><img alt="Pacmen 004" src="assets/img/PacMan4.png" height=32px>
</p>

<p align=center>
<img alt="Pacmen Right" src="howto/Pacman01.gif" height=32px> By alternating pacman images between the open and closed mouth, the pacman appears to be moving <img alt="Pacmen Left" src="howto/Pacman02.gif" height=32px>
</p>
By defining an area within the page we setup the boundaries for the pacmen, so they can only "move" within that area. Whenever they hit any edge of the area, they squash a little and revert direction, moving back to the opposite edge. The edges are insivible in the page, but coincide with the edges of the nice :beach_umbrella: beach :camera: photo . There are 3 other scenes, that are randomly cycled everytime the game is reset (or the page is reloaded).

The buttons to the left and the slider at the bottom, allow controlling the action (see [How to Run section](#how-to-run)).

I have formatted the page to become responsive with [bootstrap](https://getbootstrap.com/) via the [bootswatch](https://bootswatch.com) theme [SpaceLab](https://bootswatch.com/spacelab/). I also performed some minor and more specific adjustements through my own css style file. 

# How to Run
<p align=center> <img alt="Button Screenshot" src="howto/buttons.png" height=250px> </p>

The set of buttons at the upper-left corner of the scene allows to control the game:

* **Add Pacman**: creates a new pacman and places it in a random position within the area. By [modifying the hue of the source images](https://developer.mozilla.org/en-US/docs/Web/CSS/filter), we give the impression of re-colouring (pseudo) randomly every new pacman.
* **Start Game**: starts the motion of the pacmen. When created, every pacmen is assigned a random speed and placed at a random position, so when they start "moving", it appears they move with different velocities across the area. Motion is achieved by shifting the position of the images in a small amount and alternating between pacman images (i.e. mouth closed/open), between calls to the function [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout). 
* **Stop Game**: pauses the action, leaving every pacmen static within the area, they can regain movement by just clicking **Start Game** again, or moving the speed slider (see below)
* **Reset Game**: stops the action, cleans up the screen (i.e. removes all the pacmen) and changes the scene, by selecting another background image

<p align=center> <img alt="Slider Screenshot" src="howto/slider.png" height=250px> </p>

Below the background image, at the bottom-left corner, there is a slider that changes the speed of all the pacmen. This slider operates as an accelerator for all the pacmen, it increases all speeds in the same relative amount (i.e. accelerates the whole scenery).

<h2 align=center><img alt="Pacmen Right" src="howto/Pacman01.gif" height=32px> <a href="https://jlulloaa.github.io/pacmen"> Play with this demo </a> <img alt="Pacmen Right" src="howto/Pacman02.gif" height=32px></h2>

# Roadmap of future improvements
This is a fun excercise that allows practising a lot of interesting concepts behind front-end development.  By no means this is a finalised project, there are many improvements that can think of, and because it is an open source project, I'll be happy to see any improvement or changes perfomed by others to make this a more interesting learning tool.

Some of the improvements I have in my ToDo list are:
* Make the change in speed induced by the slider to be random for every pacmen, rather than increasing it on the same amount. At the moment, the slider affects the delay parameter in the [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) function, so the speed of all pacmen is increased in the same proportion. If we want to make that change random for every pacman, we need to change the programming logic as the slider should affect the actual speed of every pacmen, rather than the delay of the whole scene.

* Add boundaries within pacmen, so everytime they crash, they change direction. I'm not sure how to achieve that, but I'd guess it will require to consider other pacmen's position as another boundary, so would need to add that into some of the branching at the `checkCollisions` function

* Add music. By playing with it, I can already imagine hearing some mumbling that increases with the number of pacmen (pretty much like a kids party :rofl: :rofl: :rofl:)
# Contributing
Pull requests are welcome, and I'll be happy to chat about any improvement or extension that could be donde to this app.

# Credits
This software uses the following third party tools:
* The background image scenes are my own photos, which I've taken on different travel with my :camera: 
* [Bootstrap](https://getbootstrap.com/) based theme [Spacelab](https://bootswatch.com/spacelab/), from [bootswatch](https://bootswatch.com)
* The background wallpaper is from [KindPng](https://www.kindpng.com/imgv/ooJoxJ_baby-pacman-arcade-machine-hd-png-download/)

# License information
This project is licensed under the terms of <a href="https://github.com/jlulloaa/pacmen/blob/main/LICENSE" target="_blank"> MIT license </a>

