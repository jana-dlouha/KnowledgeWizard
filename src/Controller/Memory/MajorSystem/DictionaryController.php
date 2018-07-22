<?php
/**
 * Created by PhpStorm.
 * User: silwer
 * Date: 27.2.18
 * Time: 14:01
 */

namespace App\Controller\Memory\MasterSystem;


use App\Entity\Memory\MasterSystem\Dictionary;
use App\Entity\MasterSystemCharacters;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Controller\FrontController;


class DictionaryController extends FrontController
{
    /**
     * List of basic MayorSystem characters for each number
     *
     * @var array
     */
    public static $NUMBERS_TO_CHARACTERS = array(
        0 => array('s, z'),
        1 => array('t, d'),
        2 => array('n'),
        3 => array('m'),
        4 => array('r'),
        5 => array('l'),
        6 => array('č, š, ž'),
        7 => array('k'),
        8 => array('v'),
        9 => array('b, p')
    );


    /**
     * List of basic MayorSystem characters for each number
     *
     * @var array
     */
    public static $CHARACTERS = array(
        's' => 0,
        'z' => 0,
        't' => 1,
        'd' => 1,
        'n' => 2,
        'm' => 3,
        'r' => 4,
        'l' => 5,
        'č' => 6,
        'š' => 6,
        'ž' => 6,
        'k' => 7,
        'v' => 8,
        'b' => 9,
        'p' => 9
    );




    /**
     * @Route("/memory/mayorsystem/dictionary", name="Memory:MayorSystem:Dictionary")
     */
    public function importDictionaryFromFileAction()
    {
        $path = "../public/dictionary/czech.dic";
        $file = fopen($path, "r") or die("Unable to open file!");
        $words = array();

        while(!feof($file)) {
            $words[] = fgets($file);
        }

        fclose($file);

        $entityManager = $this->getDoctrine()->getManager();

        foreach ($words as $key => $word) {
            $numberCode = $this->encodeNumberToMayorSystem($word);
            $shortNumberCode = substr($numberCode, 0, 3);

            $dictionary = new Dictionary();
            $dictionary->setWord($word);
            $dictionary->setNumber($numberCode);
            $dictionary->setShortNumber($shortNumberCode);

            $entityManager->persist($dictionary);
        }

        $entityManager->flush();

        return $this->render('app/Memory/MasterSystem/index.html.twig',
            array(
                'title' => 'Mayor system',
                'navbar' => $this->generateNavbar()
            )
        );
    }


    private function encodeNumberToMayorSystem($word)
    {
        $result = [];

        for ($i = 0; $i < mb_strlen($word, 'UTF-8'); $i++) {
            $char = mb_substr($word, $i, 1, 'UTF-8');

            if(array_key_exists($char, self::$CHARACTERS)){
                $result[] = self::$CHARACTERS[$char];
            }
        }

        return implode($result);
    }


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

        return $this->render('app/Memory/MasterSystem/generator.html.twig',
            array(
                'title' => 'Master system generátor',
                'navbar' => $this->generateNavbar(),
                'table' => $table
            )
        );
    }


    protected function convertNumberToMasterSystemCharacters($number)
    {
        $converted = array();

        foreach (str_split($number) as $numeral) {
            $converted[] = implode(", ", self::$CHARACTERS[$numeral]);
        }

        return $converted;
    }


    public function testAction()
    {
        return $this->render('app/Memory/MasterSystem/test.html.twig',
            array(
                'title' => 'Master system test',
                'navbar' => $this->generateNavbar()
            )
        );
    }

}