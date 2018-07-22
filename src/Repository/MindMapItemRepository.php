<?php

namespace App\Repository;

use App\Entity\MindMapItem;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method MindMapItem|null find($id, $lockMode = null, $lockVersion = null)
 * @method MindMapItem|null findOneBy(array $criteria, array $orderBy = null)
 * @method MindMapItem[]    findAll()
 * @method MindMapItem[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MindMapItemRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, MindMapItem::class);
    }

//    /**
//     * @return MindMapItem[] Returns an array of MindMapItem objects
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
    public function findOneBySomeField($value): ?MindMapItem
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
