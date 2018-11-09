<?php
/**
 * Sample layout.
 */
use Core\Language;
use Helpers\Url;
extract($data);
?>

<div class="row">
    <div class="jumbotron text-center" style="width:100%">
        <p>Contrat n° <?= $numContrat ?></p>
    </div>
</div>


<div id="main-div" class="row">
</div>

<script type="text/javascript">
    var ajaxUrl = "<?=DIR . Url::URL_DASH_AJAX?>";

    $(document).ready(function(){
        control.init("<?= $numContrat ?>" , ajaxUrl);
    });
</script>