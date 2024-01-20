from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from django.http import JsonResponse

from django_rest_passwordreset.signals import reset_password_token_created

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, send an email to the user and return a JSON response with the reset password URL
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # Send an email to the user
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        'reset_password_url': "{}?token={}".format(
            instance.request.build_absolute_uri(reverse('password_reset:reset-password-confirm')),
            reset_password_token.key)
    }

    msg = EmailMultiAlternatives(
        "Password Reset for Your Website Title",
        "noreply@gmail.com",
        [reset_password_token.user.email]
    )
    msg.send()

    # Return a JSON response with the reset password URL
    reset_password_url = "{}?token={}".format(
        instance.request.build_absolute_uri(reverse('password_reset:reset-password-confirm')),
        reset_password_token.key)

    response_data = {
        'reset_password_url': reset_password_url,
        'email': reset_password_token.user.email,
    }

    return JsonResponse(response_data)
