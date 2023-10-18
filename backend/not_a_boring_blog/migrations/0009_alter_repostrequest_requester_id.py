# Generated by Django 4.2.4 on 2023-09-15 11:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('not_a_boring_blog', '0008_repostrequest'),
    ]

    operations = [
        migrations.AlterField(
            model_name='repostrequest',
            name='requester_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='requester', to=settings.AUTH_USER_MODEL),
        ),
    ]