<?php
/**
 * Created by PhpStorm.
 * User: silwer
 * Date: 27.2.18
 * Time: 14:01
 */

namespace App\Controller;


use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Entity\MindMap;
use App\Entity\MindMapItem;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;


/**
 * Class MindMapController
 * @package App\Controller
 */
class MindMapController extends Controller
{
    /**
     * @Route("/save-mind-map", name="MindMap:Save")
     *
     * @return Response
     */
    public function saveAction(Request $request)
    {
        $userId = 1; //TODO - user ID

        /** Check if data exists */
        if($data = $request->request->get('data')){
            $entityManager = $this->getDoctrine()->getManager();
            $mindMap = $this->getMindMap($data['wrapper']['mind-map-id']);

            /** Check if MindMap id exists */
            if(!$mindMap){
                /** If not, create new one */
                $mindMap = $this->newMindMap( $userId, $data['wrapper'] );
            } else {
                /** Delete old nodes */
                $mindItems = $entityManager
                    ->getRepository(MindMapItem::class)
                    ->findBy([
                        'mindmap_id' => $mindMap->getId(),
                        'user_id' => $userId
                    ]);

                foreach ($mindItems as $mindItem) {
                    $entityManager->remove($mindItem);
                }

                $entityManager->flush();
            }






            /** TODO - Create new mind map */


            /** TODO - Add nodes to database */


            /** TODO - Send some feedback to jquery */


            return new JsonResponse([
                'response' => 'success',
                'data' => $data
            ]);
        }

        return new JsonResponse(['text' => '$request']);
        /*return $this->render('save-mind-map.html.twig',
            array(
                'title' => 'Homepage'
            )
        );*/
    }


    /**
     * @param $id
     *
     * @return null|object
     */
    private function getMindMap($id )
    {
        if(!$id){
            throw $this->createNotFoundException('Id is not valid');
        }

        $entityManager = $this->getDoctrine()->getManager();
        $mindMap = $entityManager
            ->getRepository(MindMap::class)
            ->find($id);

        return $mindMap;
    }


    /**
     * @param $userId
     * @param $data
     *
     * @return null|object
     */
    private function newMindMap($userId, $data )
    {
        $entityManager = $this->getDoctrine()->getManager();

        $mindMap = new MindMap();
        $mindMap->setName($data['mind-map-name']);
        $mindMap->setName($userId);

        $entityManager->persist($mindMap);
        $entityManager->flush();

        return $mindMap;
    }


    private function getMindMapItemArray($mindMapId)
    {

    }

    /**
     * Handle ajax request send selected mind map
     * data to jquery
     *
     * @param $mindMapId
     */
    public function loadAction( $mindMapId ){

    }
}