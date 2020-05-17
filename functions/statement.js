const functions = require('firebase-functions');
// const cors = require('cors')({origin: true});

exports.statement = functions.https.onCall((data, context) => {
	const startTime = new Date("2020-05-17 19:00+05:30").getTime();
	const now = Date.now();
	if(context.auth && startTime < now)	// testing access
	{
		var statement = ``;
		var score = 0;
		var sample = {};
		if(data.level === 'tetris')
		{
			statement = `
			<p><span>On a boring quarantine evening, you find yourself in quite an unexceptional situation, where you have got nothing to do, and to your luck (or bad luck) it&rsquo;s raining cats and dogs outside, consequently you don&rsquo;t seem to find any reception.</span></p>
			<p><span>Having nothing to do and no possible way to pass the time, you decide to play &lsquo;Tetris&rsquo;. Fifteen minutes into the game and lightning strikes! Everything rumbles! And you tumble, into a dizzying blackout. As you slowly come back to your senses, you realize you are not in your room anymore, you are inside the world of Tetris!</span></p>
			<p><span>Trying to make sense of everything you decide to scan your surrounding, while doing so you find yourself a laptop and a note, the note goes as follows:</span></p>
			<p><br /><br /></p>
			<ul>
			<li><span>The &lsquo;Tetris Grid&rsquo; is much like an </span><b>M </b><span>x</span><b> N</b><span> matrix with row indices starting from 0 to M-1 and column indices from 0 to N-1.</span></li>
			<li><span>Multiple blocks never fall together, i.e., at any particular instance only one block can fall.</span></li>
			<li><span>Blocks fall along their respective column in a straight line starting from the 0th Row. This event of a block falling is called a Fall.</span></li>
			</ul>
			<ul>
			<li><span>Cannons are placed at each Fibonacci Row(row with a fibonacci index number), right outside the matrix at the leftmost corner.</span></li>
			<li><span>Cannon-balls follow a straight line along the row from when they are shot, until they hit the opposite wall or a falling block.</span></li>
			</ul>
			<ul>
			<li><span>At any particular instance during a Fall, a block can only be hit if it&rsquo;s in a Prime Row(row with a prime index number). Nonetheless it can be hit by multiple cannons during the same fall.</span></li>
			</ul>
			<p><br /><br /></p>
			<p><span>You understand that you must come up with a program that can calculate the maximum number of hits possible in the Tetris System.</span></p>
			<p><br /><br /></p>
			<p><span>Input:</span></p>
			<p><span>The first of the input file contains T, total number of test cases. Followed by T lines, each line containing 2 integers, M &amp; N, number of rows and columns.&nbsp;</span></p>
			<p><span>Output:</span></p>
			<p><span>The output file must contain a single string of SPACE SEPARATED integers indicating the maximum number of HITS possible, for all the test cases.</span></p>
			<img style="width: 70%; height: 70%; margin: auto;" class="image main" src="images/tetris.gif" alt=""/>
			`;
			score = 1;
			sample.input = `
			<p><span>2</span></p>
			<p><span>9 2&nbsp;</span></p>
			<p><span>4 8</span></p>
			`;
			sample.output = `
			<p><span>3 2</span></p>
			`;
		}
		else if(data.level === 'minecraft')
		{
			statement = `
			<p><span>Minecraft is a virtual sandbox world allowing people plenty of freedom choosing how they interact with it. Players explore a blocky terrain brimming with various raw materials, which they may use to </span><span>craft</span><span> tools, build structures or </span><span>earthworks</span></a><span>.&nbsp;</span></p>
			<p><span>This world also accommodates </span><span>hostile </span><span>AI-controlled &lsquo;mobs&rsquo;, inclusive of </span><span>large spiders, zombies, skeletons and various other creatures.</span><span>Frequent wars between the players and these mobs are common.&nbsp;</span></p>
			<p><span>Even still, there exists a far dangerous region in the Minecraft universe, the </span><b>Nether</b><span>, it is a </span><span>hell</span></a><span>-like dimension that can only be accessed by distinct portals, however it contains some of the most precious and unique resources. </span><span>Apparently a war has broken out in Nether, the players have come to mine the unique resources of this dimension, but the zombies are preventing them from acquiring it.</span></p>
			<p><span>As the players need to mine </span><span>miscellaneous resources</span><span> spread across different islands to build everything in this virtual world, they need a strategy to take down the power of the &lsquo;MOBS&rsquo;. They have decided to talk with the Zombie King, but when they went there, there was a long Note writing:</span></p>
			<p><span>Players,</span></p>
			<p><span>Today, I won&rsquo;t take a decision for Kill &amp; Glory, rather I will throw you a problem, if you can solve it within time, the shared resources are yours. This is a problem from the Ancient Zombies of Nether. And it goes like -</span></p>
			<p><span>The nth term of the sequence of </span><b>Nether Numbers</b><span> is given by, Z</span><span>n</span><span> = n(n+2)/3; so the first ten Nether Numbers are:</span></p>
			<p><span>1, 2, 5, 8, 11, 16, 21, 26, 33, 40</span></p>
			<p><span>Converting each letter of any word to a number corresponding to its alphabetical position (A = 1 &hellip; Z = 26) and adding these values we form a word value.&nbsp;</span></p>
			<p><span>For example, the word value for SHEBANG is 19 + 8 + 5 + 2 + 1 + 14 + 7 = 56 = Z</span><span>12</span><span>. If the word value of any given word corresponds to a Nether Number, then we shall call the word a Nethword.</span></p>
			<p><span>You need to find out the total number of Nethwords in a given note.</span></p>
			<p><span>Harmfully Yours,</span></p>
			<p><span>ZOMBIES KING</span></p>
			<p><span>Now, in this situation the Players reached out to you for immediate help, so you need to help them find the number of Nethwords as quickly as possible and save them.</span></p>
			<p><span>Input:</span></p>
			<p><span>The first input file contains T, the total of words in the file. T lines follow, each line containing a single word.</span></p>
			<p><span>Output:</span></p>
			<p><span>The output file must contain a single integer, indicating the total number of Nethwords in the input file.</span></p>
			`;
			score = 1;
			sample.input = `
			<p><span>5</span></p>
			<p><span>WHY</span></p>
			<p><span>WILL</span></p>
			<p><span>YOU </span></p>
			<p><span>ADOPT</span></p>
			<p><span>NETHER</span></p>
			`;
			sample.output = `<p><span>3</span></p>`;
		}
		else if(data.level === 'hl')
		{
			statement = `
			<p><span>Some years after Gordon Freeman and other scientists accidentally opened a portal to a dimension of hostile aliens at the Black Mesa Research Facility, Freeman is awoken from his stasis(hibernation) by the mysterious G-Man. The portal attracted the attention of the Combine, a technologically superior multidimensional empire which conquered Earth in seven hours. The Combine has implemented a brutal police state by biologically assimilating humans and other species, and preventing humans from breeding via a "suppression field".&nbsp;</span></p>
			<p><span>Now the Combine wanted</span><span> to get hold of Earth, they started to kill humans and when the human army fought back, a war broke out on earth, a war of life, a war of survival, a war between Earth and Aliens.</span></p>
			<p><span>In this war, both the parties agreed upon some rule that they must follow:</span></p>
			<p><span>The Human Army takes the first turn at attacking Aliens (The army of Combine) and gets the right to use earth&rsquo;s resources. After that anyone can make the next attacks and members from both the parties might get killed as well, however when N members are killed by any party, the right to use resources pass on to the alternate party, irrespective of which party made the kill.</span></p>
			<p><span>You shall be provided with the current number of kills by each party (</span><b>[K1]</b><span> and </span><b>[K2]</b><span> respectively) and </span><b>[N]</b><span>(value after which rights change). Can you determine which party gets the right to use resources next?</span></p>
			<p><span>Input:</span></p>
			<p><span>The first line of the input set contains the number of test cases </span><b>[T]</b><span>, followed by </span><b>[T]</b><span> lines, each containing three space-separated integers </span><b>[K1]</b><span>, </span><b>[K2]</b><span> and </span><b>[N]</b><span>.</span></p>
			<p><span>Output:</span></p>
			<p><span>The output file must contain a single SPACE SEPARATED string of characters, indicating </span><span>"PLAYERS"</span><span> if the Players get the resources or </span><span>"ZOMBIES&rdquo;</span><span> if the creatures get the resources, for all the test cases</span></p>
			<p><span>.</span></p>

			`;
			score = 2;
			sample.input = `
			<p><span>4</span></p>
			<p><span>0 3 2 </span></p>
			<p><span>55 49 34 </span></p>
			<p><span>13 10 2 </span></p>
			<p><span>34 54 2 </span></p>
			`;
			sample.output = `
			<p>ZOMBIES</p>
			<p>ZOMBIES</p>
			<p>ZOMBIES</p>
			<p>PLAYERS</p>
			`;
		}
		else if(data.level === 'nfs')
		{
			statement = `
			<p><span>Tyler "Ty" Morgan, Sean "Mac" McAlister, and Jessica "Jess" Miller are part of a crew in Silver Rock, Fortune Valley along with their friend and mechanic Ravindra "Rav" Chaudhry. After a friendly race between them, Tyler's childhood acquaintance and fixer Lina Navarro arrives, with a job for them:&nbsp;</span></p>
			<p><span>steal a precious </span><span>Koenigsegg Regera</span></a><span> belonging to Marcus "The Gambler" Weir with some high level tech inside. Tyler, posing as a test driver, successfully steals the car and evades the police. However, as he arrives at the drop point, he finds Rav knocked out.&nbsp;</span></p>
			<p><span>Lina appears, revealing that she set up Tyler and his crew to take the fall for the stolen car and she drives away, leaving them at the mercy of the oncoming police force. Tyler need to lead the Police Car away from and the biggest challenge, he will have to face them in the Grid Racing Ground which is one of the oldest and trademark racing grounds of Silver Valley that is free of obstacles and much like a matrix grid allowing the professional drivers to test acceleration, break, drift and stability.</span></p>
			<p><span>But due to the free space in the Grid Racing Ground, Tyler&rsquo;s plan is at a big threat as he cannot skip the Ground in any way. He must figure out the intersection(where his Car &amp; the Cop Car will meest) to &lsquo;take down&rsquo; the cop car. Tyler has an edge in this escape plan, as the Lamborghini Aventador has a super nitro mode.</span></p>
			<p><span>Tyler needs your help and he gave these details to us to provide you help him figuring out the precise time (if there is a chance of meet/hit).</span></p>
			<ul>
			<li><span>The Grid Racing Ground is much like an </span><b>n</b><span> x </span><b>n</b><span> matrix.&nbsp;</span></li>
			<li><span>The Police car approaches from North to South (can be considered along a particular column) with a constant velocity </span><b>[ V ]</b><span>.</span></li>
			<li><span>At that particular moment, only one police car approach from a given direction.</span></li>
			<li><span>This event of a Police Car approaching is called a Catch denoted by </span><b>[C]</b><span>. a Catch may start from any point in the Grid.</span></li>
			</ul>
			<ul>
			<li><span>Tyler&rsquo;s car is standing at a random given point on the grid and is ready to run from West to East (Can be considered across the row).</span></li>
			<li><span>Tyler&rsquo;s Car is the only car that will approach east at that moment.</span></li>
			<li><span>Tyler&rsquo;s car has zero initial velocity but some acceleration </span><b>[A]</b><span>.&nbsp;</span></li>
			<li><span>Tyler must hit nitros(start moving with acceleration A), at such a time that he may &lsquo;take down&rsquo;(hit) the police car.</span></li>
			</ul>
			<p><span>You need to find out after how many seconds Tyler must hit nitros to hit/meet the Police Car according to their starting point, approach direction, velocity and acceleration. Also, if it is not possible to take down, return -1 and give Tyler a heap of relief.</span></p>
			<p><span>P.S. Tyler has sent a Thank You letter in advance, so don&rsquo;t let him down.</span></p>
			<p><span>Input:</span></p>
			<p><span>First line of the input file contains </span><b>[T]</b><span>, number of test cases, followed by 2T line.</span></p>
			<p><span>Each test case contains two line, the first line of each test case contains </span><b>[R</b><b>p</b><b>]</b><span>, </span><b>[Cp]</b><span> and </span><b>[V]</b><span>, denoting the row number, column number and velocity of the Police Car.</span></p>
			<p><span>The second line of each pair contains </span><b>[R</b><b>c</b><b>]</b><span>, </span><b>[C</b><b>c</b><b>]</b><span> and </span><b>[A]</b><span>, row number, column number and acceleration of Tyler&rsquo;s Car.</span></p>
			<p><span>Output:</span></p>
			<p><span>The output file must contain a single SPACE SEPARATED string of integers, indicating after how many seconds Tyler must hit nitro to take down or -1 if not possible, for all the test cases.</span></p>

			<img style="width: 70%; height: 70%; margin: auto;" class="image main" src="images/nfs.gif" alt=""/>
			`;
			score = 2;
			sample.input = `
			<p><span>2</span></p>
			<p><span>10 6 23 </span></p>
			<p><span>5 8 44 </span></p>
			<p><span>42 54 32&nbsp;</span></p>
			<p><span>64 32 56 </span></p>
			`;
			sample.output = `
			<p><span>-1 0.1989</span></p>
			`;
		}
		else if(data.level === 'dmc')
		{
			statement = `
			<p><span>After the incident of Fortuna, the former knight now hunter Nero starts to build a branch for Devil May Cry, with his new partner &amp; gunsmith Nico Goldstein, daughter of Agnus. Just then, a hooded man barges in and rips the Devil Bringer off of Nero in his own home, leaving him to die bleeding with Yamato in the hooded man's hands.</span></p>
			<p><span>Regaining consciousness, Nero climbs to the top of the tree, alongside the mysterious V who is helping him, just to see Dante, Trish and Lady fighting the new demon king, Urizen. The trio gets easily defeated by the immense power of the king, and Nero is forced to escape the scene by Dante with the help of V.</span></p>
			<p><span>It is later revealed that V was the one who hired Dante and his friends to take down Urizen, however, after they are defeated, V decides to rely on Nero's help with his newly equipped Devil Breakers as a replacement for his lost arm. During the mission, overhearing information from demons, such as Malphas, in their plan to destroy the Devil Sword Sparda, V and his Familiars seek it out before them.</span></p>
			<p><span>Once acquired, V finds Dante in what seems like a comatose state. But when he was about to break the door, he saw an Encryption System on it without which the door could not be opened.The Encryption system shows the hint for decryption that V summarised to us like this and he needs your help to decrypt it:</span></p>
			<p><span>The System has a letter written on it. And blinks another letter, that you have to place either on the left side or the right side of the . When you place the blinking one, a third letter (Third because, one was previously on the system and one you placed) which you have to place again in the left or right of this string of length two, and when this blinking alphabets ends and you are done with letter placements, the system will check whether the string is alphabetically in the last position of the dictionary(lexicographically maximum string), if it is not you will be banished from ever entering the room.&nbsp;</span></p>
			<p><span>For example, for S = DAB, after writing the word D on the whiteboard, the contestant could make one of the following four sets of choices:</span></p>
			<ul>
			<li><span>put the A before D to form AD, then put the B before AD to form BAD</span></li>
			<li><span>put the A before D to form AD, then put the B after AD to form ADB</span></li>
			<li><span>put the A after D to form DA, then put the B before DA to form BDA</span></li>
			<li><span>put the A after D to form DA, then put the B after DA to form DAB</span></li>
			</ul>
			<p><span>The word is an accepted word when the contestant finishes writing all of the letters from S, under the given rules. The contestant wins the game if their word is the last of an alphabetically sorted list of all of the possible words that could have been produced.&nbsp;</span></p>
			<p><span>For the example above, the winning last word is DAB (which happens to be the same as the original word). For a game with S = JAM, the winning last word is MJA.</span></p>
			<p><span>You must decrypt the system that has shown you the string </span><b>[W]</b><span>. What's the word that you should produce?</span></p>
			<p><span> </span></p>
			<p><span>Input:</span></p>
			<p><span>The first line of the input file provides the number of test cases </span><b>[T]</b><span>, followed by </span><b>[T]</b><span> lines, each line containing a sequence </span><b>[W</b><b>i</b><b>]</b><span> for each test case.</span></p>
			<p><span>Output:</span></p>
			<p><span>The output file contains a single SPACE SEPARATED string of word, indicating the lexicographically maximum string, for all the test cases. </span></p>
			`;
			score = 3;
			sample.input = `
			<p><span>2</span></p>
			<p><span>FERRARI </span></p>
			<p><span>LAMBORGHINI </span></p>
			`;
			sample.output = `
			<p><span>RRRFEAI</span></p>
			<p><span>ROMLABGHINI</span></p>
			`;
		}
		else
		{
			return {data: "Unauthorised"};
		}
		var result = {
			level: data.level,
			statement: statement,
			scorepm: score,
			sample: sample
		};
		return {data: result};
	}
	else return {data: "Unauthorised"};
});


