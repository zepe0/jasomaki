<?php
function generateUID()
{

    return uniqid(bin2hex(random_bytes(4)), true);
}