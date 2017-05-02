<!DOCTYPE html>
<html lang="en">
	<head>		
		<!--Import Google Icon Font-->
		<link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
		<!--Import materialize.css-->
		<link type="text/css" rel="stylesheet" href="materialize/css/materialize.min.css"  media="screen,projection"/>
		
		<!--Let browser know website is optimized for mobile-->
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
	
		<!-- Link to my CSS sheet -->
		<link href="style-List.css" rel="stylesheet">
		
		<title>List</title>
	</head>
	<body>
		<h1>Christmas List</h1>
		</br>
		
		<!-- Create List -->		
		<div class="row">
			<div class="col s12">
				<div class="card-panel">
					<!-- Add area -->
					<div class="row">
						<div class="col s11">
							<input type="text" id="addNewListText" maxlength="35" placeholder="Add new list..." />
						</div>
						<div class="col s1">
							<a class="btn-floating btn-large"><i class="material-icons prefix" onclick="CreateList(addNewListText.value, listsGrid)">add</i></a>
						</div>
					</div>					
				</div>
			</div>
		</div>
		
		<!-- Grid -->
		<div class="row" id="listsGrid">
		</div>
		
		<!-- Debug -->
		<p id="debug"></p>
		
		<!-- This will be displayed if the executing browser does not support Javascript -->
		<noscript>... no JS... ...wut?</noscript>
		
		<!--Import jQuery before materialize.js-->
		<script type="text/javascript" src="jquery-3.1.1.min.js"></script>
		<script type="text/javascript" src="materialize/js/materialize.min.js"></script>
		
		<!-- Javascript -->
		<script type="text/javascript" src="List_functions_materialize.js"></script>
		
		<!-- jQuery -->
		<script type="text/javascript" src="jquery-3.1.1.js"></script>
		<script type="text/javascript" src="jquery-ui-1.12.1.custom/jquery-ui.js"></script>
		<script type="text/javascript" src="jquery-ui-1.12.1.custom/jquery-ui.min.js"></script>
		<script>
			$( ".sortable" ).sortable( {
				stop : function(event, ui){
					ReorganiseList(document.getElementById($(".sortable").attr("id"))); }
			} );
		</script>
		
		<?php
		$myfile = fopen("save.txt", "r");	
		while (($line = fgets($myfile)) != false) 
		{
			$line = str_replace(array("\r", "\n"), '', $line);
			echo '<script type="text/javascript">LoadList("'.$line.'");</script>';
		}
		fclose($myfile);
				
		if(!empty($_POST['q']))
		{
			$data = $_POST['q'];

			$file = fopen("save.txt", 'w');
			fwrite($file, $data);
			fclose($file);
		}
		?>
	</body>
</html>