<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180616180510 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE mind_map_item (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, mindmap_id INT NOT NULL, parent_id INT NOT NULL, attr_id VARCHAR(255) NOT NULL, attr_class VARCHAR(100) NOT NULL, attr_parent_id VARCHAR(100) DEFAULT NULL, attr_position VARCHAR(20) DEFAULT NULL, attr_level INT NOT NULL, attr_branch_color VARCHAR(50) DEFAULT NULL, css_top INT NOT NULL, css_left INT NOT NULL, css_background_color VARCHAR(20) NOT NULL, css_border VARCHAR(50) DEFAULT NULL, css_width INT NOT NULL, css_height INT NOT NULL, css_display VARCHAR(10) NOT NULL, created DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE mind_map_item');
    }
}
