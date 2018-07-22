<?php

namespace App\Form\Memory\MajorSystem;

use App\Entity\Memory\MajorSystem\MajorsystemUsersLists;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;


class MajorsystemUsersListType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $number = $options['data']['rowNumber'];

        $builder
            ->add('user_id', HiddenType::class, array('data' => 1))
            ->add('ms_list_id', HiddenType::class, array('data' => 1))
            ->add('ms_word', TextType::class, array('attr' => array('id' => "ms_word[$number]")))
            ->add('ms_number', HiddenType::class, array('data' => $number))
            ->add('ms_image_path')
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => MajorsystemUsersLists::class,
        ]);
    }
}
