<?php
/**
 * Welcome controller.
 *
 * @author David Carr - dave@daveismyname.com
 *
 * @version 2.2
 * @date June 27, 2014
 * @date updated Sept 19, 2015
 */
namespace Controllers;

use Core\Controller;
use Core\View;
use Helpers\Session;
use Helpers\Tools;
use Helpers\Url;
use Models\BlockchainModel;

/**
 * Sample controller showing a construct and 2 methods and their typical usage.
 */
class Welcome extends Controller
{
    /**
     * Call the parent construct.
     */
    public function __construct()
    {
        parent::__construct();
    }

    public function ajax()
    {
        $action = Tools::getPost("action");

        if ($action == "insert-block"){
            $this->insertBlock();
        }

        if ($action == "get-sinistres"){
            $this->getLastSinistre();
        }

        if ($action == "lets-encrypt"){
            $this->letsEncrypt();
        }

        $array = ["Status" => "KO"];
        echo json_encode($array);
        exit;
    }

    /**
     * Define Index page title and load template files.
     */
    public function index()
    {
        $data = [];
        $id = Session::get(BlockchainModel::F_NUM_CONTRAT);

        if(empty($id))
        {
            View::renderTemplate('header', $data);
            View::render('welcome/welcome', $data);
            View::renderTemplate('footer', $data);
            exit;
        }else{
            $data["numContrat"] = $id;

            View::renderTemplate('header' , $data);
            View::render('welcome/dashboard' , $data);
            View::renderTemplate('footer' , $data);
        }

    }

    public function verifContrat()
    {
        $id = $_POST["num-contrat"];

        $model = new BlockchainModel();
        $ret = $model->getChaineByIdContrat($id);

        if(empty($id)){
            View::renderTemplate('header');
            View::render('welcome/welcome');
            View::renderTemplate('footer');
            exit;
        }

        Session::set(BlockchainModel::F_NUM_CONTRAT , $id);
        $data["numContrat"] = $id;

        Url::redirect("");

        //View::renderTemplate('header' , $data);
        //View::render('welcome/dashboard' , $data);
        //View::renderTemplate('footer' , $data);

    }

    private function getLastSinistre()
    {
        $model = new BlockchainModel();
        $ret = $model->getChaineByIdContrat();

        $array = [
            "status" => "OK",
            "ret" => $ret,
            "index" => $model->getCurrentIncrementValue(),
            "lastHash" => $model->getLastHashBlockForContrat(),
        ];
        echo json_encode($array);
        exit;
    }

    private function insertBlock()
    {
        $dateSinistre = Tools::getPost('date')." 00:00:01";
        $lieuSinistre = Tools::getPost('lieu');
        $description = Tools::getPost('desc');

        $dbg = [
            "date" =>$dateSinistre,
            "lieu" =>$lieuSinistre,
            "desc" =>$description,
        ];

        if(empty($dateSinistre) || empty($lieuSinistre) || empty($description)){
            $array = [
                "status" => "KO",
                "Error" => "Vous n'avez pas remplis tout les champs ...",
                "dbg" => $dbg,
            ];
            echo json_encode($array);
            exit;
        }

        $model = new BlockchainModel();
        $model->insertBlock($dateSinistre , $lieuSinistre , $description);

        $array = [
            "status" => "OK",
            "dbg" => $dbg,
            "index" => $model->getCurrentIncrementValue(),
            "lastHash" => $model->getLastHashBlockForContrat(),
        ];
        echo json_encode($array);
        exit;
    }

    private function letsEncrypt()
    {
        $previous = Tools::getPost('previous');
        $date = Tools::getPost('date');
        $lieu = Tools::getPost('lieu');
        $desc = Tools::getPost('desc');

        $temp = [
            BlockchainModel::F_PRECEDENTHASH => $previous,
            BlockchainModel::F_DATE_SINISTRE => $date,
            BlockchainModel::F_LIEU_SINISTRE => $lieu,
            BlockchainModel::F_DESCRIPTION => $desc,
            BlockchainModel::F_NUM_CONTRAT => Session::get(BlockchainModel::F_NUM_CONTRAT),
        ];

        //var_dump($temp).die();

        //$hash = hash('sha256' , serialize($temp));
        $hash = md5(json_encode($temp));

        $array = [
            "status" => "OK",
            "hash" => $hash,
            "previous" => $previous,
        ];
        echo json_encode($array);
        exit;
    }

    /**
     * @return string
     */
    public function logOut()
    {
        Session::destroy(BlockchainModel::F_NUM_CONTRAT);

        $data = [];

        View::renderTemplate('header', $data);
        View::render('welcome/welcome', $data);
        View::renderTemplate('footer', $data);

    }
}
