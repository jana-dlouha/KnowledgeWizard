<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MindMapItemRepository")
 */
class MindMapItem
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $user_id;

    /**
     * @ORM\Column(type="integer")
     */
    private $mindmap_id;

    /**
     * @ORM\Column(type="integer")
     */
    private $parent_id;

    /**
     * @ORM\Column(type="string")
     */
    private $attr_id;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $attr_class;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     */
    private $attr_parent_id;

    /**
     * @ORM\Column(type="string", length=20, nullable=true)
     */
    private $attr_position;

    /**
     * @ORM\Column(type="integer")
     */
    private $attr_level;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $attr_branch_color;

    /**
     * @ORM\Column(type="integer")
     */
    private $css_top;

    /**
     * @ORM\Column(type="integer")
     */
    private $css_left;

    /**
     * @ORM\Column(type="string", length=20)
     */
    private $css_background_color;

    /**
     * @ORM\Column(type="string", length=50, nullable=true)
     */
    private $css_border;

    /**
     * @ORM\Column(type="integer")
     */
    private $css_width;

    /**
     * @ORM\Column(type="integer")
     */
    private $css_height;

    /**
     * @ORM\Column(type="string", length=10)
     */
    private $css_display;

    /**
     * @ORM\Column(type="datetime")
     */
    private $created;

    public function getId()
    {
        return $this->id;
    }

    public function getUserId(): ?int
    {
        return $this->user_id;
    }

    public function setUserId(int $user_id): self
    {
        $this->user_id = $user_id;

        return $this;
    }

    public function getMindmapId(): ?int
    {
        return $this->mindmap_id;
    }

    public function setMindmapId(int $mindmap_id): self
    {
        $this->mindmap_id = $mindmap_id;

        return $this;
    }

    public function getAttrId(): ?int
    {
        return $this->attr_id;
    }

    public function setAttrId(int $attr_id): self
    {
        $this->attr_id = $attr_id;

        return $this;
    }

    public function getAttrClass(): ?string
    {
        return $this->attr_class;
    }

    public function setAttrClass(string $attr_class): self
    {
        $this->attr_class = $attr_class;

        return $this;
    }

    public function getParentId(): ?int
    {
        return $this->parent_id;
    }

    public function setParentId(int $parent_id): self
    {
        $this->parent_id = $parent_id;

        return $this;
    }

    public function getAttrParentId(): ?string
    {
        return $this->attr_parent_id;
    }

    public function setAttrParentId(?string $attr_parent_id): self
    {
        $this->attr_parent_id = $attr_parent_id;

        return $this;
    }

    public function getAttrPosition(): ?string
    {
        return $this->attr_position;
    }

    public function setAttrPosition(?string $attr_position): self
    {
        $this->attr_position = $attr_position;

        return $this;
    }

    public function getAttrLevel(): ?int
    {
        return $this->attr_level;
    }

    public function setAttrLevel(int $attr_level): self
    {
        $this->attr_level = $attr_level;

        return $this;
    }

    public function getAttrBranchColor(): ?string
    {
        return $this->attr_branch_color;
    }

    public function setAttrBranchColor(?string $attr_branch_color): self
    {
        $this->attr_branch_color = $attr_branch_color;

        return $this;
    }

    public function getCssTop(): ?int
    {
        return $this->css_top;
    }

    public function setCssTop(int $css_top): self
    {
        $this->css_top = $css_top;

        return $this;
    }

    public function getCssLeft(): ?int
    {
        return $this->css_left;
    }

    public function setCssLeft(int $css_left): self
    {
        $this->css_left = $css_left;

        return $this;
    }

    public function getCssBackgroundColor(): ?string
    {
        return $this->css_background_color;
    }

    public function setCssBackgroundColor(string $css_background_color): self
    {
        $this->css_background_color = $css_background_color;

        return $this;
    }

    public function getCssBorder(): ?string
    {
        return $this->css_border;
    }

    public function setCssBorder(?string $css_border): self
    {
        $this->css_border = $css_border;

        return $this;
    }

    public function getCssWidth(): ?int
    {
        return $this->css_width;
    }

    public function setCssWidth(int $css_width): self
    {
        $this->css_width = $css_width;

        return $this;
    }

    public function getCssHeight(): ?int
    {
        return $this->css_height;
    }

    public function setCssHeight(int $css_height): self
    {
        $this->css_height = $css_height;

        return $this;
    }

    public function getCssDisplay(): ?string
    {
        return $this->css_display;
    }

    public function setCssDisplay(string $css_display): self
    {
        $this->css_display = $css_display;

        return $this;
    }

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(\DateTimeInterface $created): self
    {
        $this->created = $created;

        return $this;
    }
}
