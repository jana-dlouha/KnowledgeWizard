<?php

namespace App\Repository;

use App\Entity\Memory\MajorSystem\Dictionary;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Dictionary|null find($id, $lockMode = null, $lockVersion = null)
 * @method Dictionary|null findOneBy(array $criteria, array $orderBy = null)
 * @method Dictionary[]    findAll()
 * @method Dictionary[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DictionaryRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Dictionary::class);
    }


    /**
     * @param $shortNumber
     *
     * @return array
     */
    public function findWordsByShortNumber($shortNumber)
    {
        return $this->createQueryBuilder('d.word')
            ->andWhere('d.short_number = :short_number')
            ->setParameter('short_number', $shortNumber)
            ->andWhere('d.type = 1')
            ->orderBy('d.word', 'ASC')
            ->setMaxResults(100)
            ->getQuery()
            ->getResult();
    }


    /**
     * Returns array of words for selected number
     *
     * @param $number
     * @return array|null
     */
    public function findWordsByNumber($number)
    {
        $dictionaryWords = $this->createQueryBuilder('d')
            ->andWhere('d.number = :number')
            ->setParameter('number', $number)
            ->andWhere('d.type = :type')
            ->setParameter('type', 1)
            ->orderBy('d.word', 'ASC')
            ->setMaxResults(100)
            ->getQuery()
            ->getResult();

        if ($dictionaryWords) {
            $words = array();

            /** @var Dictionary $word */
            foreach ($dictionaryWords as $word) {
                $words[] = $word->getWord();
            }

            return $words;
        }

        return null;
    }


    /**
     * Returns array of words for selected number
     *
     * @param $number
     *
     * @return array|null
     */
    public function findWords($number)
    {
        $dictionaryWords = $this->createQueryBuilder('d')
            ->andWhere('d.number < :number')
            ->setParameter('number', $number + 1)
            ->andWhere('d.type = :type')
            ->setParameter('type', 1)
            ->orderBy('d.word', 'ASC')
            ->setMaxResults(100000)
            ->getQuery()
            ->getResult();

        if ($dictionaryWords) {
            $words = array();

            /** @var Dictionary $word */
            foreach ($dictionaryWords as $word) {
                $words[$word->getNumber()][] = $word->getWord();
            }

            return $words;
        }

        return null;
    }

}
