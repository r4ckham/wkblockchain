<?php
/**
 * Sample layout.
 */
use Core\Language;
use Helpers\Url;
extract($data);
?>

<div class="row">
    <div class="jumbotron text-center container" style="background: #373a3d;color: aliceblue;margin-left: 12px">
        <h1>BlockChain</h1>
        <p>Contrat n° <u><?= $numContrat ?></u></p>
    </div>
</div>


<div id="main-div" class="row">
</div>

<script type="text/javascript">
    var ajaxUrl     = "<?=DIR . Url::URL_DASH_AJAX?>";
    var logOutUrl   = "<?=DIR . Url::URL_LOGOUT ?>";

    $(document).ready(function(){
        control.init("<?= $numContrat ?>" , ajaxUrl , logOutUrl);
    });
</script>