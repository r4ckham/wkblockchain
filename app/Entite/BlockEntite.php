<?php
/**
 * Created by PhpStorm.
 * User: rougelotugo
 * Date: 08/11/2018
 * Time: 19:11
 */

namespace Entity;
use Models\BlockchainModel;


class BlockEntite
{
    public function getHash()
    {
        return $this->{BlockchainModel::F_HASH};
    }

    public function getPrecentHash()
    {
        return $this->{BlockchainModel::F_PRECEDENTHASH};
    }

    public function getDateSinistre()
    {
        return $this->{BlockchainModel::F_DATE_SINISTRE};
    }

    public function getLieuSinistre()
    {
        return $this->{BlockchainModel::F_LIEU_SINISTRE};
    }

    public function getDescription()
    {
        return $this->{BlockchainModel::F_DESCRIPTION};
    }

    public function getNumCont()
    {
        return $this->{BlockchainModel::F_NUM_CONTRAT};
    }

}