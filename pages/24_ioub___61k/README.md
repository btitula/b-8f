# Test XSS

```
<script>alert(1)</script>
"><img src=x onerror=alert(1)>
'><svg onload=alert(1)></svg>
```