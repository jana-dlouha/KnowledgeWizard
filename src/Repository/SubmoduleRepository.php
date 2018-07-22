<?php

namespace App\Repository;

use App\Entity\Submodule;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Submodule|null find($id, $lockMode = null, $lockVersion = null)
 * @method Submodule|null findOneBy(array $criteria, array $orderBy = null)
 * @method Submodule[]    findAll()
 * @method Submodule[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SubmoduleRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Submodule::class);
    }

//    /**
//     * @return Submodule[] Returns an array of Submodule objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Submodule
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
