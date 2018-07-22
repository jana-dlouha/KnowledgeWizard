<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20180616175155 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE mind_map_item');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE mind_map_item (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, mindmap_id INT NOT NULL, key_code INT NOT NULL, parent_key INT DEFAULT NULL, text VARCHAR(255) DEFAULT NULL COLLATE utf8mb4_unicode_ci, color VARCHAR(40) NOT NULL COLLATE utf8mb4_unicode_ci, line_color VARCHAR(40) NOT NULL COLLATE utf8mb4_unicode_ci, direction VARCHAR(20) NOT NULL COLLATE utf8mb4_unicode_ci, location DOUBLE PRECISION NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
    }
}
