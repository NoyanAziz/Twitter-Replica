# Generated by Django 3.2.7 on 2021-10-04 11:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tweets', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='tweet',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
