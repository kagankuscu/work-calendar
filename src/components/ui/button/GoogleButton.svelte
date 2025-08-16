<script lang="ts">
    const login = async () => {
        await fetch('/api/auth/login');
    }
</script>

<!-- Google Login Section -->
<div class="flex justify-center">
    <a
        href='/work-calendar/api/auth/login'
        id="googleLoginBtn"
        class="google-login-btn">
        <img src="google.svg" alt="google"/>
        Sign in with Google
    </a>
</div>