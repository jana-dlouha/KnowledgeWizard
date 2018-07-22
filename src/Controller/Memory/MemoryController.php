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
     * @route("/", name="App:homepage")
     */
    public function homeAction (){
        return $this->render('app/index.html.twig',
            array('navbar' => $this->generateNavbar())
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
            $navModules[] = array(
                'name' => $module->getName(),
                'status' => $module->getStatus(),
                'path' => 'App:' . $module->getPath(),
                'submodules' => $this->getDoctrine()
                    ->getRepository(Submodule::class)
                    ->findBy(array('parent_module' => $module->getId()))
            );
        }

        return $navModules;
    }

}