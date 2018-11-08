<?php
/**
 * Sample layout.
 */
use Core\Language;
extract($data);
?>

<div class="row">
    <div class="jumbotron text-center" style="width:100%">
        <h1>Déclaration de sinistre</h1>
        <p>Contrat n° <?= $numContrat ?></p>
    </div>
</div>


<div id="main-div" class="row">
</div>

<script type="text/javascript">
    $(document).ready(function(){
        control.init("<?= $numContrat ?>");
    });
</script>