GONYYI.COM (c) by Gon Y. of Deoksu-Yi
-------------------------------------

![DSYIM](http://gonyyi.com/img/dsyim50.svg)

(c) Copyright 2016-2021 Gon Y. Yi of Deoksuyi. All rights reserved.  
Detail copyright information can be found: <https://gonyyi.com/copyright.txt>

- Validation: <https://html5.validator.nu/?doc=https%3A%2F%2Fgonyyi.com>
- Archiving: <https://web.archive.org/save/https://gonyyi.com>



TODO for GIT ACTION
-------------------

Only the files in `/src` direction will be updated. Then, (1) `/build.py` script
will run, creates the output to `/docs` directory. This step is supposed to be
done by the Git Action. To do so, followings are required:

- [ ] Decide what tags will be using to identify what needs to be updated/included.
- [ ] Create templates for:
- [ ] The program will:
	- [ ] Open a config file `/config.json`
		- [ ] Identify what is the CSS file. (eg. `/src/gonyyi.css`)
		- [ ] What are available pages and keywords
			- Later 404 can "suggest" the pages based on this..
	- [ ] Open each files in `/src` directory, update:
		- Header
		- Footer
		- inline CSS
	- [ ] Maybe insert a build date in the footer with same color as background
		  OR light gray color within parenthesis. 
		  OR could be a hidden within the source code?
- [ ] Goal
	- [ ] Able to test and develop within `/src` direcotry and its files directly
		  on a local machine.
	- [ ] When built using `/build.py`, all CSS should be included in each file.
		- Able to distingush "page specific" portion of CSS and files.



VERSION HISTORY
---------------

- 1.1.1 Default font to be Georiga, Serif
- 1.1.2 Changed color and 404 layout (Sat, Feb 3, 2018)
- 1.1.3 Order of link changed, changes in description 
- 1.1.4 Change introduction header from "a potbellied artist and a dreammer" to "a dreaming artist" also removed superscripts and its descriptions. (feb 10, 2018)
- 1.1.5 Change description from "a dreaming artist" to "an artist with a big dream" (Feb 10, 2018)
- 1.1.6 Change link 'Blogger' to 'Blog'
- 1.1.7 "I am Gon Y. Yi, an artist and a farmer" to "I am Gon Y. Yi. I am an artist at heart." (Aug 4, 2018)
- 1.1.8 Disabled links to Github, LinkedIn, and Keybase
- 1.1.9 Enable Github, LinkedIn
- 1.2.0 Added hash page. Use separate css file. 
- 1.3.0 Add copyright page. Changed some cosmetic things.
- 1.3.1 Add html.head.base.href for index, 404, hash, and copyright pages
  (4/20/19)
- 1.4.0 Add Deoksuyi Crest to Copyright page. Also, logo will have diff
  color depend on network protocol (eg. http, https, file)
- 1.4.1 Minor changes on logo alignmenet; copyright at the bottom.
- 1.5.0 To the possibly simplest form. (Mar 10, 2020)
- 1.6.0 Design change while staying simple
- 2.0.0 (2020.06.19g) redesign, added /lost.
- 2.1.0 (2020.06.23a) restructure to use h1/h2 tags.
- 2.1.1 (2020.08.11a) slight adjustment on h1 font and footer::after
- 2.2.0 (2020.09.13a) added pinterest link
- 2.3.0 (2020.10.10a) simplified all
- 2.3.1 (2020.10.19a) added dark mode again.
- 2.3.2 (2020.10.20a) changed hyperlink color in dark mode to #81aaff
- 3.0.0 (2021.03.18a) cleaned all css. dotted list became a line using left border with thickness 5px.
- 3.0.1 (2021.03.18b) now unit of size is rem; based on 5px root size.
- 3.1.0 (2021.03.20a) new round select on menu (mlink)
