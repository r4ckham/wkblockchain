<?php
/**
 * Sample layout.
 */
use Core\Language;
use Helpers\Url;

?>

<div class="row">
    <div class="jumbotron text-center" style="width:100%">
        <h1>Déclaration de sinistre</h1>
        <p>Page de déclaration des sinistres</p>
    </div>
</div>


<div id="main-div" class="row">
    <div style="height:300px;width:100%;background:seagreen;border-radius: 15px;">
        <div style="margin-left: 30%;margin-right: 30%;margin-top: 150px">
            <form action="<?= DIR . Url::URL_VERIFY ?>" method="post">
            <div class="input-group" style="margin-bottom:10px">\
                <div class="input-group-prepend">
                    <span class="input-group-text">N° Contrat</span>
                </div>

                    <input id="main-input-contrat" name="num-contrat" class="form-control">
                    <div class="input-group-append">
                        <input type="submit" class="btn btn-success" value="Rechercher">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    $(document).ready(function(){

    });
</script>