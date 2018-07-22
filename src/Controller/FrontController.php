<?php
/**
 * Created by PhpStorm.
 * User: silwer
 * Date: 27.2.18
 * Time: 14:01
 */

namespace App\Controller;


use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Entity\Module;
use App\Entity\Submodule;


class FrontController extends Controller
{
    /**
     * @route("/", name="homepage")
     */
    public function homeAction (){
        return $this->render('index_mind_map.html.twig',
            array(
                'navbar' => $this->generateNavbar(),
                'title' => 'Homepage'
            )
        );
    }

    /**
     * @return array
     */
    public function generateNavbar()
    {
        $modules = $this->getDoctrine()
            ->getRepository(Module::class)
            ->findAll();

        if (!$modules) {
            throw $this->createNotFoundException(
                'No submodules found.'
            );
        }

        $navModules = array();

        foreach ($modules as $module) {
            $navModules[$module->getId()] = array(
                'name' => $module->getName(),
                'status' => $module->getStatus(),
                'path' => $module->getPath(),
                'submodules' => $this->getDoctrine()
                    ->getRepository(Submodule::class)
                    ->findBy(array('parent_module' => $module->getId()))
            );
        }

        return $navModules;
    }


    /**
     * @route("/psychologie", name="Psychologie:homepage")
     *
     * @return Response
     */
    public function psychologieAction()
    {
        return $this->render('index.html.twig',
            array(
                'navbar' => $this->generateNavbar(),
                'title' => 'Homepage'
            )
        );
    }
}