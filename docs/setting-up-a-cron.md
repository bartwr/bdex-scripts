# Setting up a cron

Sometimes you just want a script do your tasks.

On Linux -and presumably MacOS as well- you can set up a cron job to do repetative tags for you.

In this document we set up a collection of crons that people use for managing the BarterDEX marketmaker.

## Restart your marketmaker proces once a day

If you run BarterDEX' marketmaker with SPV nodes, the computer's memory is depleated very fast. If you still want to run SPV nodes instead of downloading the native blockchains, you can restart the process once in a while.

It's a hack, but without big consequences. If many orders are routed through your node, the order book keeps caching these. It'd be good if there comes a marketmaker with auto memory clearing, though I understand that running native blockchains is recommended.

*Now,* if you _want_ to restart the marketmaker once a day, you have to do the following.

We assume you have created a startup script like:

**start-lp:**

    pkill -15 marketmaker
    cd ~/SuperNET/iguana/dexscripts
    ./client &
    sleep 120
    ./setpassphrase
    sleep 30
    ./electrum
    sleep 5
    ./auto_chipskmd

If so,

1. For restarting your marketmaker once a day, first open a Terminal.

2. Type `crontab -e` to edit your crontab, the place where recurring scripts are listed.

3. Fill in when you want to restart the marketmaker:

    # m h  dom mon dow   command
      0 2    *   *   *   ~/start-lp.sh

4. Save the crontab file.

Now the `start-lp.sh` file will be executed every day, at 02:00h. The script restarts the marketmaker.
