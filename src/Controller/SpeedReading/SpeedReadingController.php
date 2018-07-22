<?php
/**
 * Created by PhpStorm.
 * User: silwer
 * Date: 27.2.18
 * Time: 14:01
 */

namespace App\Controller\Memory;


use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Entity\Module;
use App\Entity\Submodule;
use App\Controller\FrontController;


class MemoryController extends FrontController
{
    /**
     * @route("/memory", name="App:Memory")
     */
    public function homeAction (){
        return $this->render('app/Memory/index.html.twig',
            array(
                'title' => 'Memory',
                'navbar' => $this->generateNavbar()
            )
        );
    }


    /**
     * @Route("/memory/mastersystem", name="App:Memory:MasterSystem")
     */
    public function masterSystemAction()
    {

    }


    /**
     * @Route("/memory/cards", name="App:Memory:Cards")
     */
    public function cardsAction()
    {

    }

}