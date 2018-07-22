<?php

namespace App\Repository;

use App\Entity\Memory\MajorSystem\MajorsystemUsersLists;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method MajorsystemUsersLists|null find($id, $lockMode = null, $lockVersion = null)
 * @method MajorsystemUsersLists|null findOneBy(array $criteria, array $orderBy = null)
 * @method MajorsystemUsersLists[]    findAll()
 * @method MajorsystemUsersLists[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MajorsystemUsersListsRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, MajorsystemUsersLists::class);
    }

    /**
     * Returns selected user's MajorSystem list by list id
     * as array of words with number as key (or null when failed)
     *
     * @param $userId
     * @param $listId
     *
     * @return array|null
     */
    public function getUserList($userId, $listId)
    {
        $userList = $this->createQueryBuilder('l')
            ->andWhere('l.user_id = :user_id')
            ->setParameter('user_id', $userId)
            ->andWhere('l.ms_list_id = :ms_list_id')
            ->setParameter('ms_list_id', $listId)
            ->orderBy('l.ms_number', 'ASC')
            ->getQuery()
            ->getResult();

            if ($userList) {
                $words = array();

                /** @var MajorsystemUsersLists $word */
                foreach ($userList as $word) {
                    $words[$word->getMsNumber()] = $word->getMsWord();
                }

                return $words;
            }

            return null;
        }


    /**
     * Returns default MajorSystem list by list id
     * as array of words with number as key (or null when failed)
     *
     * @return array|null
     */
    public function getDefaultUserList()
    {
        $userListDefault = $this->createQueryBuilder('l')
            ->andWhere('l.user_id = :user_id')
            ->setParameter('user_id', 1)
            ->andWhere('l.ms_list_id = :ms_list_id')
            ->setParameter('ms_list_id', 1)
            ->orderBy('l.ms_number', 'ASC')
            ->getQuery()
            ->getResult();

        if($userListDefault){
            $defaultWords = array();

            /** @var MajorsystemUsersLists $word */
            foreach ($userListDefault as $word) {
                $defaultWords[$word->getMsNumber()] = $word->getMsWord();
            }

            return $defaultWords;
        }

        return null;
    }
}
