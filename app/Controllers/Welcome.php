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

        if(empty($ret)){
            View::renderTemplate('header');
            View::render('welcome/welcome');
            View::renderTemplate('footer');
        }

        Session::set(BlockchainModel::F_NUM_CONTRAT , $id);
        $data["numContrat"] = $id;

        View::renderTemplate('header' , $data);
        View::render('welcome/dashboard' , $data);
        View::renderTemplate('footer' , $data);

    }

    public function insertBlock()
    {
        $numSinistre = Tools::getPost('numSinistre');
        $dateSinistre = Tools::getPost('dateSinistre');
        $lieuSinistre = Tools::getPost('lieuSinistre');
        $description = Tools::getPost('description');

        $model = new BlockchainModel();
        $model->insertBlock($numSinistre, $dateSinistre , $lieuSinistre , $description);
    }
}
