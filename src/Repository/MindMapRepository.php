<?php

namespace App\Repository;

use App\Entity\MindMap;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method MindMap|null find($id, $lockMode = null, $lockVersion = null)
 * @method MindMap|null findOneBy(array $criteria, array $orderBy = null)
 * @method MindMap[]    findAll()
 * @method MindMap[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MindMapRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, MindMap::class);
    }

//    /**
//     * @return MindMap[] Returns an array of MindMap objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?MindMap
    {
        return $this->createQueryBuilder('m')
            ->andWhere('m.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
