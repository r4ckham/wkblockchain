<?php
/**
 * Created by PhpStorm.
 * User: rougelotugo
 * Date: 08/11/2018
 * Time: 19:00
 */

namespace Models;


use Core\Model;
use Entity\BlockEntite;
use Helpers\Database;
use Helpers\Session;

class BlockchainModel extends Model
{
    const F_INDEX = "id";
    const F_HASH = "Hash";
    const F_PRECEDENTHASH   = "PrecedentHash";
    const F_DATE_SINISTRE   = "DateSinistre";
    const F_LIEU_SINISTRE   = "LieuSinistre";
    const F_DESCRIPTION     = "Description";
    const F_NUM_CONTRAT     = "NumCont";

    private $table = Database::TABLE_BLOCK;

    public function __construct()
    {
        parent::__construct();
    }

    public function getChaineByIdContrat()
    {
        $id = Session::get(self::F_NUM_CONTRAT);
        if(empty($id))
        {
            return null;
        }

        $f_num_cont = self::F_NUM_CONTRAT;
        $ps = [":id" => $id];

        $sql = "SELECT * FROM $this->table ";
        $sql.= "WHERE $f_num_cont = :id";

        return $this->db->select($sql, $ps);
    }

    public function getCurrentIncrementValue()
    {
        $sql = "SELECT AUTO_INCREMENT FROM  INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'axa_blockchain' AND   TABLE_NAME = '$this->table'";
        $row = $this->db->select($sql);
        //var_dump($row[0]->{"AUTO_INCREMENT"}).die();
        return $row[0]->{"AUTO_INCREMENT"};
    }

    public function getLastHashBlockForContrat()
    {
        $id = Session::get(self::F_NUM_CONTRAT);
        if(empty($id))
        {
            return null;
        }

        $f_num_cont = self::F_NUM_CONTRAT;
        // RECUPERER LE HASH DU PRECEDENT MAIS PAS SON PRECEDENT HASH /!\
        $f_precedent_hash = self::F_HASH;
        $f_index = self::F_INDEX;
        $ps = [":id" => $id];

        $sql = "SELECT $f_precedent_hash FROM $this->table ";
        $sql.= "WHERE $f_num_cont = :id ORDER BY $f_index DESC LIMIT 1";

        //var_dump($sql).die();

        $rows = $this->db->select($sql, $ps);

        if(empty($rows)){
            return "0";
        }

        return $rows[0]->{"$f_precedent_hash"};
    }

    public function insertBlock( $dateSinistre , $lieuSinistre , $description)
    {
        $numContrat = Session::get(self::F_NUM_CONTRAT);

        $temp = [
            self::F_PRECEDENTHASH => $this->getLastHashBlockForContrat(),
            self::F_DATE_SINISTRE => $dateSinistre,
            self::F_LIEU_SINISTRE => $lieuSinistre,
            self::F_DESCRIPTION => $description,
            self::F_NUM_CONTRAT => $numContrat,
        ];

        $hash = md5(json_encode($temp));
        //var_dump($hash , json_encode($temp)).die();

        $data = [
            self::F_INDEX => $this->getCurrentIncrementValue(),
            self::F_INDEX => $this->getCurrentIncrementValue(),
            self::F_DATE_SINISTRE => $dateSinistre,
            self::F_LIEU_SINISTRE => $lieuSinistre,
            self::F_DESCRIPTION => $description,
            self::F_PRECEDENTHASH => $this->getLastHashBlockForContrat(),
            self::F_HASH => $hash,
            self::F_NUM_CONTRAT => $numContrat,
        ];

        $this->db->insert($this->table , $data);

    }




}