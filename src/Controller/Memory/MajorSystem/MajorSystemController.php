<?php
/**
 * Created by PhpStorm.
 * User: silwer
 * Date: 27.2.18
 * Time: 14:01
 */

namespace App\Controller\Memory\MajorSystem;


use App\Entity\MajorSystemLetters;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Controller\FrontController;


class MasterSystemController extends FrontController
{
    /**
     * List of basic MajorSystem characters for each number
     *
     * @var array
     */
    public static $CHARACTERS = array(
        '0' => array('s, z'),
        '1' => array('t, d'),
        '2' => array('n'),
        '3' => array('m'),
        '4' => array('r'),
        '5' => array('l'),
        '6' => array('č, š, ž'),
        '7' => array('k'),
        '8' => array('v'),
        '9' => array('b, p'),
    );




    /**
     * @Route("/memory/mastersystem", name="Memory:MajorSystem")
     */
    public function masterSystemAction()
    {
        return $this->render('app/Memory/MajorSystem/index.html.twig',
            array(
                'title' => 'Master system',
                'navbar' => $this->generateNavbar()
            )
        );
    }


    /**
     * @Route("/memory/mastersystem/generator", name="Memory:MajorSystem:Generator")
     */
    public function getGeneratorTableAction()
    {
        $table = array();

        for($i = 1; $i <= 100; $i++){
            $table[$i] = array(
                'number' => $i,
                'word' => "empty",
                'characters' => implode(" + ", $this->convertNumberToMasterSystemCharacters($i)),
                'words' => array()
            );
        }

        return $this->render('app/Memory/MajorSystem/generator.html.twig',
            array(
                'title' => 'Master system generátor',
                'navbar' => $this->generateNavbar(),
                'table' => $table
            )
        );
    }


    /**
     * Gets number (ex. 533) and converts it to array of MajorSystem
     * characters (ex. array(l, m, m)
     *
     * @param int $number
     * @return array
     */
    protected function convertNumberToMasterSystemCharacters($number)
    {
        $converted = array();

        foreach (str_split($number) as $numeral) {
            $converted[] = implode(", ", self::$CHARACTERS[$numeral]);
        }

        return $converted;
    }


    /**
     * @Route("/memory/mastersystem/test", name="Memory:MajorSystem:Test")
     */
    public function testAction()
    {
        return $this->render('app/Memory/MajorSystem/test.html.twig',
            array(
                'title' => 'Master system test',
                'navbar' => $this->generateNavbar()
            )
        );
    }

}