<?php

	print($_POST["receiver"]);
	print($_POST["subject"]);
	print($_POST["message"]);

	mail($_POST["receiver"], $_POST["subject"], $_POST["message"]);
?>